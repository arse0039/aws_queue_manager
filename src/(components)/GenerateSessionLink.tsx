"use client";
import React, { useState, useEffect } from 'react';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface GenerateSessionLinkProps {
    setSessionStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setSessionID: React.Dispatch<React.SetStateAction<number | undefined>>;
    userID: string;
    sessionID: number | undefined;
}

const GenerateSessionLink = ({ setSessionStarted, setSessionID, userID, sessionID }: GenerateSessionLinkProps) => {
    const [sessionLink, setSessionLink] = useState<string>("");
    const [linkCopied, setLinkCopied] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkExistingSession = () => {
            setIsLoading(true);
            if (sessionID) {
                const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
                setSessionLink(`${baseURL}/OHSession/${userID}/${sessionID}`);
                setSessionStarted(true);
            }
            setIsLoading(false);
        };
        checkExistingSession();
    }, [sessionID, userID, setSessionStarted]);

    const generateSessionLink = async () => {
        const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
        const newSessionID = Math.floor(Math.random() * (10000000 - 10000 + 1)) + 10000;
        setSessionLink(`${baseURL}/OHSession/${userID}/${newSessionID}`);
        setSessionStarted(true);
        setSessionID(newSessionID);

        document.cookie = `sessionID=${newSessionID}; path=/; max-age=14400`;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`, {
            method: "POST",
            body: JSON.stringify({ userID: userID, sessionID: newSessionID }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.ok) {
            console.log('Session created successfully');
        } else {
            console.error('Failed to create session');
        }
    };

    const handleLinkCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(sessionLink);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 1000);
        } catch (error) {
            console.error('Failed to copy session link to clipboard');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center m-5">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {sessionLink ? (
                        <div className="flex flex-row items-center bg-gray-100 dark:bg-gray-800 m-2 pr-1 pl-1 rounded-md">
                            <p className="pr-1 pl-1 relative text-wrap">{sessionLink}
                                {linkCopied && (
                                    <span className="absolute top-[-35px] right-0 bg-green-200 text-success-green p-1 rounded-md fade-out">
                                        Link copied to clipboard!
                                    </span>
                                )}
                            </p>
                            <span className="border-l border-gray-300 mx-2 self-stretch"></span>
                            <FontAwesomeIcon
                                icon={faCopy}
                                className="cursor-pointer pr-2"
                                onClick={handleLinkCopy}
                            />
                        </div>
                    ) : (
                        <button className='btn' onClick={generateSessionLink}>
                            Generate office hour session link.
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default GenerateSessionLink;
