import React,{ useState, useEffect} from 'react';
import { useContext } from 'react';
import { Context } from '../Context/AuthContext';

import api from '../services/api';

export default function Users(){
    const { authenticated, handleLogout } = useContext(Context);
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        api.get('/users')
        .then((response) =>{
            setUsers(response.data)
        })
        .catch((error) =>{
            console.log(error);
        })
    })


    return(
        <>
        
            {users.map((user) =>(
                <li key={user.id}>({user.name}){user.website}</li>
            ))}


            {authenticated ? <button onClick={handleLogout}>Sair</button> : ''}

        </>
    )
}