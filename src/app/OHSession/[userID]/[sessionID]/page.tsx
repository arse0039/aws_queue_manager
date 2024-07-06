"use client"
import React, { FormEvent, useState } from 'react';

interface StudentDataProps {
    firstName: string,
    lastName: string,
    email: string,
    description: string
}

const OHSession = ({params}:any) => {
    const [studentData, setStudentData] = useState<StudentDataProps>({
        firstName: "",
        lastName: "",
        email:"",
        description: ""
    });

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleChange = (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement
        >
      ) => {
        const value = event.target.value;
        const name = event.target.name;
        setStudentData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

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
                <label>Last Name </label>
                <input 
                    id="lastName"
                    name="lastName"
                    type='text' 
                    value={studentData.lastName}
                    onChange={handleChange}
                    className="text-black bg-gray-100 dark:bg-nav-light"
                    required={true}
                />
                <label>First Name </label>
                <input 
                    id="firstName"
                    name="firstName"
                    type='text' 
                    value={studentData.firstName}
                    onChange={handleChange}
                    className="text-black bg-gray-100 dark:bg-nav-light"
                    required={true}
                />
                <label>School Email </label>
                <input 
                    id="email"
                    name="email"
                    type='text' 
                    value={studentData.email}
                    onChange={handleChange}
                    className="text-black bg-gray-100 dark:bg-nav-light"
                    required={true}
                />
                <label>Please provide a brief description of your issue.</label>
                <textarea 
                    id="description"
                    name="description"
                    value={studentData.description}
                    onChange={handleChange}
                    className="text-black bg-gray-100 dark:bg-nav-light"
                    rows={5}
                    required={true}
                />
                <input type='submit' className="btn" value="Add me to the queue!"/>

            </form>
        </div>
    )
}

export default OHSession;
