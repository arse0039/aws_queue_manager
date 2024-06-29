'use client'
import React from 'react';
import { Amplify } from 'aws-amplify';
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import outputs from '../../amplify_outputs.json';

//ssr set to true ensures that data is stored as cookies instead of locally
Amplify.configure(outputs, {ssr: true})


const AuthProvider = ({ children }:{children: React.ReactNode}) => {
    return (
        <Authenticator.Provider>{children}</Authenticator.Provider>
    )
}

export default AuthProvider;