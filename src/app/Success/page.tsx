"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

interface StudentCount {
  position: number;
  totalInQueue: number;
}

const SuccessPage = () => {
  const [refreshQueue, setRefreshQueue] = useState<boolean>(false);
  const [queuePosition, setQueuePosition] = useState<StudentCount | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const params = useSearchParams();
  const sessionID = params.get('sessionID');
  const email = params.get('email');
  const router = useRouter();

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const connectWebSocket = () => {
      if (sessionID) {
        const wsUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}?sessionID=${sessionID}&email=${email}&userType=student`;
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log("WebSocket connection opened");
          reconnectAttempts = 0;
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'QUEUE_UPDATE') {
            setRefreshQueue((prev) => !prev);
            console.log("Refreshed!");
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
            setFetchError('Socket disconnected, unable to reconnect');
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
  }, [sessionID, email]);

  useEffect(() => {
    const fetchData = async () => {
      if (sessionID && email) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/students?sessionID=${sessionID}&email=${email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            const json = await response.json();
            setQueuePosition(json);
          } else {
            console.error(`Error fetching data: ${response.statusText}`);
            setFetchError(`Error fetching data: ${response.statusText}`);
          }
        } catch (error) {
          console.error("Error fetching data", error);
          setFetchError("Error fetching data");
        }
      } else {
        console.log("No sessionID or email provided");
        setFetchError("No sessionID or email provided");
      }
    };

    fetchData();
  }, [sessionID, email, refreshQueue, router]);

  return (
    <div className="flex flex-col justify-center items-center m-4">
      {fetchError ? (
        <div>
            <h1 className="text-3xl p-2">Hooray!</h1>
            <p>Looks like you have been helped! </p>
            <p> If need more help, use the session link to rejoin the queue. </p>
            <p> Good luck and happy coding!</p>
        </div>
      ) : queuePosition ? (
        <>
            <h1 className="text-3xl p-2">GREAT SUCCESS!</h1>
          <p>Your current position in the queue is:</p>
          <p className="text-7xl p-2">{queuePosition.position}</p>
          <p>Out of {queuePosition.totalInQueue} students.</p>
          <p>The TA will reach out to you via Teams once it is your turn.</p>
          <p>Thank you for your patience!</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SuccessPage;
