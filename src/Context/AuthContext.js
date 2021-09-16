import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import history from '../history';
const Context = createContext();

function AuthProvider({children}){
    const [authenticated, setAuthenticated] = useState(false);
    const [ loading, setLoading] = useState(true);

    useEffect(() =>{
        const token = localStorage.getItem('token');

        if(token){
            api.defaults.headers.Authorization = `Baerer ${token}`;
            setAuthenticated(true);
        }
        
    }, [])

    async function handleLogin(e){
        e.preventDefault();
        const response  = await api.post('/authenticate');
    
        
        
        localStorage.setItem('token', JSON.stringify(response.data.token))
        api.defaults.headers.Authorization = `Baerer ${response.data.token}`;
        setAuthenticated(true)
        history.push('/users')

    
    }



    function handleLogout(){
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorizarion = undefined;
        history.push('/login');
    }
    if(!loading){
        return<h1>Loading</h1>
    }


    return(
        <>
            <Context.Provider value={{authenticated,  handleLogin, handleLogout }}>
                {children}
            </Context.Provider>
        
        </>
    )

} 

export { Context, AuthProvider};