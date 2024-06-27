"use client"

import {useContext} from 'react';
import { ThemeContext} from '../(contexts)/ThemeProvider';

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a Theme Provider');
    }
    return context;
}