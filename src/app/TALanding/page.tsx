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
    
        let ws: WebSocket | null = null
        const connectWebSocket = () => {
            if (sessionID) {
                const wsUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}?sessionID=${sessionID}`;
                ws = new WebSocket(wsUrl);
    
                ws.onopen = () => {
                    console.log("WebSocket connection opened");
                };
                
                //when a user is added to the queue, the webSocket will send a message to the client,
                // with the type "QUEUE_UPDATE", triggering a refresh of the data. 
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    console.log("Message received", data);
                    if (data.type === 'QUEUE_UPDATE') {
                        setRefreshQueue((prev) => !prev);
                        console.log("Queue refreshed!");
                    } 
                };
    
                // When a disconnect occurs, we want to refresh the connection, which lives for 4 hours.
                ws.onclose = (event) => {
                    console.log('Socket disconnected', event);
                    setSocketDisconnect((prev) => !prev);
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