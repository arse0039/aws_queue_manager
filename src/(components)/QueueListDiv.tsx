"use client"
import React, { useState, useCallback, useEffect } from 'react';


interface QueueListDivProps {
    children: React.ReactNode
    containerRef: React.RefObject<HTMLDivElement>
}

const QueueListDiv = ({children, containerRef}:QueueListDivProps) => {    
    const [rightPanelWidth, setRightPanelWidth] = useState<number>(300); 


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
            <div className="flex h-full">
                <div 
                    className="w-1 bg-gray-400 cursor-ew-resize"
                    onMouseDown={handleMouseDown}
                ></div>
                <div 
                    className="overflow-auto flex flex-col"
                    style={{ width: `${rightPanelWidth}px` }}
                >
                    {children}
                </div>
            </div>
    )
}

export default QueueListDiv;