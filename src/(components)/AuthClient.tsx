"use client";
import { useEffect, useState } from 'react';
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import { useTheme } from "../(hooks)/useTheme";
import { lightTheme, darkTheme } from "@/utils/amplifyTheme";

const AuthClient = () => {
    const { darkMode } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(darkMode ? darkTheme : lightTheme)
    
    useEffect(() => {
        setCurrentTheme(darkMode ? darkTheme : lightTheme);
    }, [darkMode]);

    return (
        <ThemeProvider theme={currentTheme}>
            <Authenticator/>
        </ThemeProvider>
    )
}

export default AuthClient;




