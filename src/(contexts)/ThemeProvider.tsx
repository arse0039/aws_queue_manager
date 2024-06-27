"use client"

import React, {useState, createContext, useEffect, ReactNode} from 'react';

interface ThemeContextInterface {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

export const ThemeProvider: React.FC<{children:ReactNode}> = ({children}) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
          }
      }, []);
    
      const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
        localStorage.setItem('darkMode', darkMode.toString());
        document.documentElement.classList.toggle('dark');
      };

    return (
        <ThemeContext.Provider value={ {darkMode, toggleDarkMode} }>
            {children}
        </ThemeContext.Provider>
    )
}