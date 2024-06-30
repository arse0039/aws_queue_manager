"use client"
import React, { useState, useEffect } from 'react';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const GenerateSessionLink  = ({setSessionStarted}:{
    setSessionStarted: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [sessionLink, setSessionLink] = useState<string>("");
    const [linkCopied, setLinkCopied] = useState<boolean>(false);

    useEffect(() => {
        // Check if a session already exists for the user in the browser.

        const checkExistingSession = () => {
          const cookies = document.cookie.split(';');
          const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('sessionID='));
          if (sessionCookie) {
            const sessionID = sessionCookie.split('=')[1];
            const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
            setSessionLink(`${baseURL}/OHSession/${sessionID}`);
            setSessionStarted(true);
          }
        };
      
        checkExistingSession();
      }, []);

    // generate a random int value for the session. These sessions will only last for 4 hours
    // so the odds of overlap of ID values should be low. SessionID will be stored in the browser
    // to help persist session data. 
    const generateSessionLink = () => {
        const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
        const sessionID = Math.floor(Math.random() * (10000000 - 10000 + 1)) + 10000;
        setSessionLink(`${baseURL}/OHSession/${sessionID}`)
        setSessionStarted(true);

        document.cookie = `sessionID=${sessionID}; path=/; max-age=14400`;
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
                <p className="pr-1 pl-1 relative">{sessionLink} <span className="border-l border-gray-300 mx-2 h-4"></span>
                {linkCopied && (
                    <span className="absolute top-[-30px] right-0 bg-green-200 text-success-green p-1 rounded-md fade-out">
                    Link copied to clipboard!
                    </span>
              )}
                </p> 
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