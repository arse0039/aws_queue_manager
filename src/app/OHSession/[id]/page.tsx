"use client"
import React, { FormEvent } from 'react';

const OHSession = ({params}:any) => {

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const name = "Brando"

    return (
        <div className="flex flex-col justify-center items-center p-4 text-default-text-black dark:text-default-text-white">
            <div className="flex flex-col justify-center items-center pb-5"> 
            <h1>Welcome to {name}'s' Office Hours</h1>
            <p className="flex text-center p-5 max-w-[55%]">Please fill out the form using your official Oregon State email address and provide a brief description of what you need assistance with and {name} will be with your as soon as possible.
            </p>
            </div>
            <form
                className="flex flex-col gap-3 w-1/2"
                method="post"
                onSubmit={handleSubmit}
            >
                <label>School Email </label>
                <input 
                    id="email"
                    name="email"
                    type='text' 
                    value=""
                    className="bg-gray-100 dark:bg-nav-light"
                    required={true}
                />
                <label>Please provide a brief description of your issue.</label>
                <textarea 
                    id="desc"
                    name="desc"
                    value=""
                    className="bg-gray-100 dark:bg-nav-light"
                    rows={5}
                    required={true}
                />
                <input type='submit' className="btn" value="Add me to the queue!"/>

            </form>
        </div>
    )
}

export default OHSession;
