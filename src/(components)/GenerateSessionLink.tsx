"use client"
import React, { useState, useEffect } from 'react';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { UserData } from '@/lib/definitions';

interface GenereateSessionLinkProps {
    setSessionStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setSessionID: React.Dispatch<React.SetStateAction<number | undefined>>;
    userID: string;
    sessionID: number | undefined;
}

const GenerateSessionLink  = ({setSessionStarted, setSessionID, userID, sessionID} : GenereateSessionLinkProps) => {
    const [sessionLink, setSessionLink] = useState<string>("");
    const [linkCopied, setLinkCopied] = useState<boolean>(false);

    useEffect(() => {
        // Check if the user already has an active session
        const checkExistingSession = () => {
          if (sessionID) {
            const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
            setSessionLink(`${baseURL}/OHSession/${userID}/${sessionID}`);
            setSessionStarted(true);
          }
        };
        checkExistingSession();
      }, [sessionID, userID, setSessionStarted]);

    // generate a random int value for the session. These sessions will only last for 4 hours
    // so the odds of overlap of ID values should be low. SessionID will be stored in the browser
    // to help persist session data. 
    const generateSessionLink = async () => {
        const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
        const sessionID = Math.floor(Math.random() * (10000000 - 10000 + 1)) + 10000;
        setSessionLink(`${baseURL}/OHSession/${userID}/${sessionID}`)
        setSessionStarted(true);
        setSessionID(sessionID)

        document.cookie = `sessionID=${sessionID}; path=/; max-age=14400`;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`, {
            method: "POST",
            body: JSON.stringify({userID:userID, sessionID:sessionID}),
            headers: { 
              "Content-Type": "application/json" ,
            }
          });
          
        if (res.ok) {
            console.log('Session created successfully');
        } else {
            console.error('Failed to create session');
        }
    }

    // utility function to copy data to the clipboard and manage state used to display
    // the copied alert message to users
    const handleLinkCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(sessionLink);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 1000);
        } catch (error) {
            console.error('Failed to copy session link to clipboard')
        }
    }
    
    return (
        <div className="flex flex-col justify-center items-center m-5">
            { sessionLink ? (
            <div className="flex flex-row items-center bg-gray-100 dark:bg-gray-800 m-2 pr-1 pl-1 rounded-md ">
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
                    onClick={ handleLinkCopy}
                    />
            </div>) 
            : null}
            {!sessionLink &&
            <button className='btn' onClick={generateSessionLink}> Generate office hour session link.</button>
            }
        </div>
    )
}

export default GenerateSessionLink;