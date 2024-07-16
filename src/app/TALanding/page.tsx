"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useDataFetching } from '@/(hooks)/fetchData';
import { StudentData, UserData } from '@/lib/definitions';
import GenerateSessionLink from '@/(components)/GenerateSessionLink';
import QueueCount from '@/(components)/QueueCount';
import StudentQueueCard from '@/(components)/StudentQueueCard';
import QueueListDiv from '@/(components)/QueueListDiv';
import CurrentStudent from '@/(components)/CurrentStudent';
import DeleteButton from '@/(components)/DeleteButton';


const TALandingPage = ({userID} : {userID: string}) => {    
    const [sessionStarted, setSessionStarted] = useState<boolean>(false);
    const [sessionID, setSessionID] = useState<number | undefined>(undefined);
    const [refereshQueue, setRefreshQueue] = useState<boolean>(false);
    const [sessionData, setSessionData] = useState<UserData[]>([]);
    const [queueData, setQueueData] = useState<StudentData[]>([]);
    const [socketDisconnect, setSocketDisconnect] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const webSocket = useRef<WebSocket | null>(null);

    useDataFetching<UserData[]>(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users?userID=${userID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
        [],
        setSessionData
    )

    useEffect(() => {
        if (sessionData && sessionData.length > 0) {
            setSessionID(sessionData[0].sessionID);
            setSessionStarted(true);
        }
    }, [sessionData, userID]);

    useDataFetching<StudentData[]>(
        sessionID ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/queueManager?sessionID=${sessionID}` : '',
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        },
        [sessionID, refereshQueue],
        setQueueData
    );

    useEffect(() => {
        let ws: WebSocket | null = null;
        let reconnectAttempts = 0;
        const maxReconnectAttempts = 5;
    
        const connectWebSocket = () => {
            if (sessionID) {
                const wsUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}?sessionID=${sessionID}&userType=TA`;
                ws = new WebSocket(wsUrl);
    
                ws.onopen = () => {
                    console.log("WebSocket connection opened");
                    reconnectAttempts = 0;
                };
                
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === 'QUEUE_UPDATE') {
                        setRefreshQueue((prev) => !prev);
                        console.log("Queue refreshed!");
                    } 
                };
    
                ws.onclose = (event) => {
                    console.log('Socket disconnected', event);
                    if (reconnectAttempts < maxReconnectAttempts) {
                        const timeout = Math.pow(2, reconnectAttempts) * 1000;
                        setTimeout(() => {
                            reconnectAttempts++;
                            connectWebSocket();
                        }, timeout);
                    } else {
                        setSocketDisconnect(true);
                    }
                };
    
                ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
            }
        };
    
        connectWebSocket();
    
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [sessionID, socketDisconnect]);
    
    return (
        <div ref={containerRef} className="flex h-screen w-full">
            <div className="flex-grow flex flex-col justify-start items-center">
                {sessionStarted && <QueueCount count={queueData && queueData.length || 0}/>}
                {queueData && queueData.length > 0 &&
                <div className=" max-w-[40%]">
                    <CurrentStudent queueData={queueData[0]}/>
                    <DeleteButton queueData={queueData[0]} refresh={setRefreshQueue}/>
                </div>
        
                }
                <GenerateSessionLink userID={userID} setSessionStarted={setSessionStarted} setSessionID={setSessionID} sessionID={sessionID}/>
            </div>
            <QueueListDiv containerRef={containerRef}>
                <div className="flex p-4 items-center justify-center">
                    Student Queue
                </div>
                {queueData && queueData?.map((student, idx) => (
                    <StudentQueueCard key={idx} lastName={student.lastName} firstName={student.firstName} index={idx+1} addedTime={student.dateAdded} />
                ))}
                
            </QueueListDiv>
        </div>
    )
}

export default TALandingPage;