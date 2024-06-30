"use client"
import React, {useState} from 'react';
import GenerateSessionLink from '@/(components)/GenerateSessionLink';

const TALandingPage: React.FC = () => {    
    const [sessionStarted, setSessionStarted] = useState<boolean>(false)

    return (

        <GenerateSessionLink setSessionStarted={setSessionStarted}/>
    )
}

export default TALandingPage;