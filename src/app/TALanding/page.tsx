"use client"
import React, { useState, useRef, useCallback, useEffect } from 'react';
import GenerateSessionLink from '@/(components)/GenerateSessionLink';
import QueueCount from '@/(components)/QueueCount';

const TALandingPage: React.FC = () => {    
    const [sessionStarted, setSessionStarted] = useState<boolean>(false);
    const [rightPanelWidth, setRightPanelWidth] = useState<number>(200); 
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateRightPanelWidth = () => {
            if (containerRef.current) {
                const maxWidth = containerRef.current.offsetWidth * 0.3;
                setRightPanelWidth((prevWidth) => Math.min(prevWidth, maxWidth));
            }
        };

        updateRightPanelWidth();
        window.addEventListener('resize', updateRightPanelWidth);

        return () => window.removeEventListener('resize', updateRightPanelWidth);
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const newWidth = containerRect.right - e.clientX;
            const maxWidth = containerRect.width * 0.3;
            setRightPanelWidth(Math.max(200, Math.min(newWidth, maxWidth)));
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <div ref={containerRef} className="flex h-screen w-full">
            <div className="flex-grow flex flex-col justify-start items-center">
                {sessionStarted && <QueueCount/>}
                <GenerateSessionLink setSessionStarted={setSessionStarted}/>
            </div>
            <div className="flex h-full">
                <div 
                    className="w-1 bg-gray-400 cursor-ew-resize"
                    onMouseDown={handleMouseDown}
                ></div>
                <div 
                    className="overflow-auto flex flex-col"
                    style={{ width: `${rightPanelWidth}px` }}
                >
                    {/* Content for the right panel */}
                    <div className="p-4">
                        Student Queue
                    </div>
                    <div className="m-2 flex pb-2 justify-start border-b border-gray-300">
                        <h1 className="mr-2">1.</h1><p> LastName, FirstName</p>
                    </div>
                    <div className="m-2 flex pb-2 justify-start border-b border-gray-300">
                        <h1 className="mr-2">2.</h1><p> LastName, FirstName</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TALandingPage;