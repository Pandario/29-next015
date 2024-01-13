"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"


const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const value = e.target.value; 
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        const res = await fetch("/api/Users",{
            method: "POST",
            body: JSON.stringify({ formData }),
            "content-type" : "application/json"
        });

        if(!res.ok) {

            const response = await res.json();
            setErrorMessage(response.message);
        }else{
            router.refresh();
            router.push("/");
        }
    };

return(
    <>
        <form 
            onSubmit={handleSubmit}
            method="post"
            className="space-y-4 lg:space-y-0"
        >
            <h1 className="text-xl font-bold">Create New User</h1>
            <div className="flex flex-col pb-3 space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">

                <div className="flex-grow">
                    <label className="mb-2 block">Full Name</label>
                    <input
                        id="name" 
                        name="name"
                        type="text" 
                        onChange={handleChange} 
                        required={true} 
                        value={formData.name} 
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div className="flex-grow">
                    <label className="mb-2 block">Email</label>
                    <input 
                        id="email" 
                        name="email"
                        type="text" 
                        onChange={handleChange} 
                        required={true} 
                        value={formData.email} 
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div className="flex-grow">
                    <label className="mb-2 block">Password</label>
                    <input 
                        id="password" 
                        name="password"
                        type="password" 
                        onChange={handleChange} 
                        required={true} 
                        value={formData.password} 
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

            </div>
            <button 
                type="submit" 
                value="Create User"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded self-end"
            >
                Submit
            </button> 

            
        </form>
        <p className="text-red-500">{errorMessage}</p>
    </>
)
};

export default UserForm;

/*
<form 
            onSubmit={handleSubmit}
            method="post"
            className="flex flex-col gap-3 w-1/2"
        >
            <h1>Create New User</h1>
            <label>Full Name</label>
            <input 
                id="name" 
                name="name"
                type="text" 
                onChange={handleChange} 
                required={true} 
                value={formData.name} 
                className="m-2 bg-slate-400 rounded"
            />

            <label>Email</label>
            <input 
                id="email" 
                name="email"
                type="text" 
                onChange={handleChange} 
                required={true} 
                value={formData.email} 
                className="m-2 bg-slate-400 rounded"
            />

            <label>Password</label>
            <input 
                id="password" 
                name="password"
                type="password" 
                onChange={handleChange} 
                required={true} 
                value={formData.password} 
                className="m-2 bg-slate-400 rounded"
            />
            <input 
                type="submit" 
                value="Create User"
                className="bg-blue-300 hover:bg-blue-100"
            />
        </form> */