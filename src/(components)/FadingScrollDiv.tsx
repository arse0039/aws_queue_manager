"use client"
import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

interface FadingScrollDivProps {
    children: ReactNode
}

const FadingElement = ({children}:{children:FadingScrollDivProps}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.5, 1], // Input range
        [0.5, 1, 0.5] // Output range
    );

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className="min-h-screen flex items-center justify-center"
        >
            <div>
                {children}
            </div>
        </motion.div>
    );
};

export default FadingElement;