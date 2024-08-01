"use client"
import React from 'react';
import { motion } from "framer-motion";

const GenericLanding: React.FC = () => {
    return (
        <div className="min-h-screen mx-2">
            <motion.div
                className="h-[60vh] flex flex-col justify-center items-start p-3"
                initial={{ opacity: 0,}}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.7 }}
            >
                <div className="flex flex-col justify-center items-start ml-8">
                    <h1 className="text-3xl font-bold mb-4">Welcome to the Office Hour Queue Manager!</h1>
                    <p className="max-w-2xl">
                        After spending nearly two years working as a TA at Oregon State University, I often struggled with managing
                        the queue of students using just Microsoft Teams. Keeping up with the order and how long students had been in 
                        the queue was challenging during busy office hour times. This app exists to overcome these issues by 
                        helping TA&apos;s and instructors more easily manage virtual office hour queues.
                    </p>
                </div>
            </motion.div>
            
            <motion.div
                className="h-[55vh] flex justify-end m-2 p-4"
                initial={{ opacity: 0}}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.7 }}
            >
                <div className="flex w-[70vw] flex-row justify-between items-center">
                    <div className="flex-1 mx-2">
                        <p> IMAGE PLACEHOLDER</p>
                    </div>
                    <div className="flex-1">
                        <p className="max-w-2xl">
                            Once logged in, users can generate a session link for to send to students. Students use this session link to fill out a
                            form, which adds them to the user&apos;s virtual office hour queue.
                        </p>
                    </div>
                </div>

            </motion.div>
            <motion.div
                className="h-[60vh] flex items-start m-2 p-4"
                initial={{ opacity: 0}}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.7 }}
            >
                <div className="flex w-[70vw]">
                    <div className="flex-1 mx-2">
                        <p className="max-w-2xl">
                            User&apos;s can easily view their office hour queue with near real-time updates with visual timers for student wait times.
                            Interact with the next student via Microsoft Teams with the click of a button. 
                        </p>
                    </div>
                    <div className="flex-2 mx-2">
                        <p> IMAGE PLACEHOLDER</p>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default GenericLanding;
