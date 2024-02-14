import { createContext, useEffect, useState } from "react";
import axios from 'axios'


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });
    
    useEffect(() => {
        const data=localStorage.getItem("auth")
        if(data){
            const parsedData=JSON.parse(data)
            setAuth({
                user:parsedData.user,
                token:parsedData.token
            })
        }
    }, [])
    
    axios.defaults.headers.common["Authorization"] = auth?.token;

    

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider }
