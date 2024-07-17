"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useDataFetching } from '@/(hooks)/fetchData';
import { StudentData, UserData } from '@/lib/definitions';
import { fetchAuthSession } from 'aws-amplify/auth';
import GenerateSessionLink from '@/(components)/GenerateSessionLink';
import QueueCount from '@/(components)/QueueCount';
import StudentQueueCard from '@/(components)/StudentQueueCard';
import QueueListDiv from '@/(components)/QueueListDiv';
import CurrentStudent from '@/(components)/CurrentStudent';
import DeleteButton from '@/(components)/DeleteButton';

interface TALandingPageProps {
    userID: string,
}

const TALandingPage = ({ userID }: TALandingPageProps) => {    
    const [sessionStarted, setSessionStarted] = useState<boolean>(false);
    const [sessionID, setSessionID] = useState<number | undefined>(undefined);
    const [refreshQueue, setRefreshQueue] = useState<boolean>(false);
    const [sessionData, setSessionData] = useState<UserData[]>([]);
    const [queueData, setQueueData] = useState<StudentData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [idToken, setIdToken] = useState<string | undefined>("");
    const containerRef = useRef<HTMLDivElement>(null);
    const webSocket = useRef<WebSocket | null>(null);

    useEffect(() => {
        const getAuthToken = async () => {
            try {
                const { tokens } = await fetchAuthSession();
                setIdToken(tokens?.idToken?.toString());
            } catch (error) {
                console.error('Error fetching auth token:', error);
            }
        };
        getAuthToken();
    }, []);

    // Fetch user data
    useDataFetching<UserData[]>(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users?userID=${userID}`,
        {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": idToken,
          },   
        },
        [],
        (data) => {
            setSessionData(data);
            setIsLoading(false); // Set loading to false after fetching
        }
    );

    useEffect(() => {
        if (sessionData && sessionData.length > 0) {
            setSessionID(sessionData[0].sessionID);
            setSessionStarted(true);
        }
    }, [sessionData]);

    useDataFetching<StudentData[]>(
        sessionID ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/queueManager?sessionID=${sessionID}` : '',
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": idToken ? idToken : '',
             },
        },
        [sessionID, refreshQueue],
        setQueueData
    );

    useEffect(() => {
        if (sessionID) {
            const wsUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}?sessionID=${sessionID}&userType=TA`;
            webSocket.current = new WebSocket(wsUrl);
            
            webSocket.current.onopen = () => {
                console.log("WebSocket connection opened");
            };
            
            webSocket.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'QUEUE_UPDATE') {
                    setRefreshQueue((prev) => !prev);
                    console.log("Queue refreshed!");
                } 
            };

            webSocket.current.onclose = (event) => {
                console.log('Socket disconnected', event);
            };

            webSocket.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }

        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    }, [sessionID]);

    return (
        <div ref={containerRef} className="flex h-screen w-full">
            {isLoading ? (
                <p className="items-center justify-center">Loading...</p>
            ) : (
                <>
                    <div className="flex-grow flex flex-col justify-start items-center">
                        {sessionStarted && <QueueCount count={queueData.length} />}
                        {queueData.length > 0 && (
                            <div className="max-w-[40%]">
                                <CurrentStudent queueData={queueData[0]} />
                                <DeleteButton queueData={queueData[0]} refresh={setRefreshQueue} />
                            </div>
                        )}
                        <GenerateSessionLink userID={userID} setSessionStarted={setSessionStarted} setSessionID={setSessionID} sessionID={sessionID} />
                    </div>
                    <QueueListDiv containerRef={containerRef}>
                        <div className="flex p-4 items-center justify-center">
                            Student Queue
                        </div>
                        {queueData.map((student, idx) => (
                            <StudentQueueCard key={idx} lastName={student.lastName} firstName={student.firstName} index={idx + 1} addedTime={student.dateAdded} />
                        ))}
                    </QueueListDiv>
                </>
            )}
        </div>
    );
}

export default TALandingPage;
