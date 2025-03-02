"use client"
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateOregonStateEmail } from '@/utils/utilityFunctions';
import { StudentData } from '@/lib/definitions';

const OHSession = ({params}:any) => {
    const [studentData, setStudentData] = useState<StudentData>({
        sessionID: params.sessionID as string,
        userID: params.userID as string,
        firstName: "",
        lastName: "",
        email:"",
        description: "",
        dateAdded: new Date(),
    });

    const [validEmail, setValidEmail] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateOregonStateEmail(studentData.email)) {
            setValidEmail("Please enter a valid @oregonstate.edu address")
            return;
        }
        setStudentData((prev) => ({
            ...prev,
            dateAdded: new Date(Date.now())
        }))
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/queueManager/`, {
            method: "POST",
            body: JSON.stringify( studentData ),
            headers: { 
              "Content-Type": "application/json" ,
            }
          });
      
          if (!res.ok) {
            throw new Error("Failed add student to the queue");
          }

        
        router.push(`/Success?sessionID=${params.sessionID}&email=${studentData.email}`);
      
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
        if (name === 'email') {
            setValidEmail("")
        }
      };

    const name = "Brando"

    return (
        <div className="flex flex-col justify-center items-center p-4 text-default-text-black dark:text-default-text-white">
            <div className="flex flex-col justify-center items-center pb-5"> 
            <h1>Welcome to your Office Hours!</h1>
            <p className="flex text-center p-5 max-w-[55%]">Please fill out the form using your official Oregon State email address and provide a brief description of what you need assistance with and the TA or instructor will be with your as soon as possible.
            </p>
            </div>
            <form
                className="flex flex-col gap-3 w-1/2"
                method="post"
                onSubmit={handleSubmit}
            >
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
                <div className="flex justify-between">
                <label>School Email </label>
                {validEmail && (
                    <span className="text-error-red">{validEmail}</span>
                )}
                </div>
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
                    maxLength={300}
                    rows={5}
                    required={true}
                />
                <input type='submit' className="btn" value="Add me to the queue!"/>

            </form>
        </div>
    )
}

export default OHSession;
