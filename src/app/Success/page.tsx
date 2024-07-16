"use client"
import { useSearchParams } from "next/navigation";
import { useDataFetching } from "@/(hooks)/fetchData";
import React, {useState, useEffect} from 'react';

interface StudentCount {
    position: number,
    totalInQueue: number

}

const SuccessPage = () => {
    const [refreshQueue, setRefreshQueue] = useState<boolean>(false);
    const [queuePosition, setQueuePosition] = useState<StudentCount>({position: 0, totalInQueue: 0});

    const params = useSearchParams();
    const sessionID = params.get('sessionID');
    const email= params.get('email');

    useDataFetching<StudentCount>(
        sessionID ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/students?sessionID=${sessionID}&email=${email}` : '',
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        },
        [sessionID, email, refreshQueue],
        setQueuePosition
    );

    return (
        <div className="flex flex-col justify-center items-center m-4">
            <h1 className="text-3xl p-2">GREAT SUCCESS!</h1>
            <p>Your currently position in the queue is:</p>
            <p className="text-7xl p-2">{queuePosition.position} </p>
            <p>Out of {queuePosition.totalInQueue} students.</p>
            <p> The TA will reach out to you via Teams once it is your turn. </p>
            <p>Thank you for your patience!</p>
        </div>
    )
}

export default SuccessPage;