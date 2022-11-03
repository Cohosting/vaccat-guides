import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase";
import { getOrCreateUser } from "../firebase/auth";


export const contextObject = createContext(null);





export const AuthContextComponent = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (!currentUser && user) {
                const currentUser = await getOrCreateUser(user);
                setCurrentUser(currentUser)
            }

        })


        return () => {
            unsubscribe()
        }
    }, [])


    console.log(currentUser)
    return (
        <contextObject.Provider value={{
            currentUser, setCurrentUser
        }}>
            {children}
        </contextObject.Provider>
    )
}