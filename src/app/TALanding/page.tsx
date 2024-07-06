"use client"
import React, { useState, useRef } from 'react';
import GenerateSessionLink from '@/(components)/GenerateSessionLink';
import QueueCount from '@/(components)/QueueCount';
import StudentQueueCard from '@/(components)/StudentQueueCard';
import QueueListDiv from '@/(components)/QueueListDiv';

const TALandingPage = ({userID} : {userID: string}) => {    
    const [sessionStarted, setSessionStarted] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="flex h-screen w-full">
            <div className="flex-grow flex flex-col justify-start items-center">
                {sessionStarted && <QueueCount/>}
                <GenerateSessionLink userID={userID} setSessionStarted={setSessionStarted}/>
            </div>
            <QueueListDiv containerRef={containerRef}>
                <div className="flex p-4 items-center justify-center">
                    Student Queue
                </div>
                <StudentQueueCard lastName='Steele' firstName='Melissa' index={1} addedTime={new Date(Date.now() - 5000)} />
            </QueueListDiv>
        </div>
    )
}

export default TALandingPage;