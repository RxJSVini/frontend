import React from 'react';
import { Switch, Route, Link, Redirect} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Users from './pages/Users.jsx';

import { Context } from './Context/AuthContext';
import { useContext } from 'react';

function CustomRoute({ isPrivate, ... rest}){

    const { authenticated } = useContext(Context);

    if(isPrivate && authenticated){
        return <Redirect to='/login'/>

    }   


    return <Route {... rest}/>
}

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route  isPrivate exact path="/users" component={Users}></Route>
        </Switch>
    )
}