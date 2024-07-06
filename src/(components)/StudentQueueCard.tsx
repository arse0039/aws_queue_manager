"use client"
import React, {useState, useEffect} from 'react';

interface StudentCardProps {
    firstName: string,
    lastName: string,
    index: number,
    addedTime: Date
}

const StudentQueueCard = ({firstName, lastName, index, addedTime}:StudentCardProps) => {
    const [elapsedTime, setElapsedTime] = useState<string>('00:00:00');
    const [timerColor, setTimerColor] = useState<string>('text-green-500')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - addedTime.getTime();
      
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      if (minutes > 15) {
        setTimerColor('text-red-500 font-bold flashing-text');
      } else if (minutes > 10) {
        setTimerColor('text-orange-400 font-bold');
      } else {
        setTimerColor('text-green-500');
      }

      setElapsedTime(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );

    }, 1000);

    return () => clearInterval(timer);
  }, [addedTime]);

    return (
        <div className="m-2 flex pb-2 justify-start border-b border-gray-300">
            <h1 className="mr-2">{index}.</h1><p> {lastName}, {firstName}</p><span className="mx-2"> - </span><span className={`${timerColor}`}>{elapsedTime}</span>
        </div>
    )
}

export default StudentQueueCard;