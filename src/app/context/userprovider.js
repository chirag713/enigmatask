"use client";

import React, { useEffect, useState } from 'react';
import UserContext from './usercontext';
import { toast } from 'react-toastify';
import { currentuser } from '@/services/userservice';

const UserProvider = ({ children }) => {


    console.log("hello");
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        async function loadCurrentUser() {
            try {
                const loggedUser = await currentuser();
                console.log("Hello");
                console.log(loggedUser);
                setUser({...loggedUser});
            } catch (error) {
                console.error("Error loading current user:", error);
                // toast.error("Error loading current user", {
                //     position: "top-center",
                // });
                setUser(undefined);
            }
        }

        loadCurrentUser();
    }, []); // Run once after initial render
    


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
