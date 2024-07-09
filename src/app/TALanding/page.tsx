"use client"
import React, { useState, useRef, useEffect } from 'react';
import GenerateSessionLink from '@/(components)/GenerateSessionLink';
import QueueCount from '@/(components)/QueueCount';
import StudentQueueCard from '@/(components)/StudentQueueCard';
import QueueListDiv from '@/(components)/QueueListDiv';
import { useDataFetching } from '@/(hooks)/fetchData';
import { StudentData, UserData } from '@/lib/definitions';

const TALandingPage = ({userID} : {userID: string}) => {    
    const [sessionStarted, setSessionStarted] = useState<boolean>(false);
    const [sessionID, setSessionID] = useState<number | undefined>(undefined);
    const [refereshQueue, setRefreshQueue] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const userSession = useDataFetching<UserData[]>(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users?userID=${userID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
        []
    )

    useEffect(() => {
        if (userSession && userSession.length > 0) {
            setSessionID(userSession[0].sessionID);
        }
    }, [userSession]);

    const queueData = useDataFetching<StudentData[]>(
        sessionID ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/queueManager?sessionID=${sessionID}` : '',
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        },
        [sessionID, refereshQueue]
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshQueue((prev) => !prev); 
        }, 5000);
        return () => clearInterval(interval);
    },[]);
    
    return (
        <div ref={containerRef} className="flex h-screen w-full">
            <div className="flex-grow flex flex-col justify-start items-center">
                {sessionStarted && <QueueCount count={queueData && queueData.length || 0}/>}
                <GenerateSessionLink userID={userID} setSessionStarted={setSessionStarted}/>
            </div>
            <QueueListDiv containerRef={containerRef}>
                <div className="flex p-4 items-center justify-center">
                    Student Queue
                </div>
                {queueData?.map((student, idx) => (
                    <StudentQueueCard key={idx} lastName={student.lastName} firstName={student.firstName} index={idx+1} addedTime={student.dateAdded} />
                ))}
                
            </QueueListDiv>
        </div>
    )
}

export default TALandingPage;