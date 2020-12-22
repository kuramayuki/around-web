import React, {useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';

function Main(props) {
    const{ isLoggedIn, handleLoggedIn } = props;
    // console.log(handleLoggedIn);
    const showLogin = () => {
        //case 1: already logged in
        //case 2: not logged in yet
        return isLoggedIn ? <Redirect to="/home" /> : <Login handleLoggedIn = {handleLoggedIn}/>
    };

    const showHome = () => {
        //logged in ?
        return isLoggedIn ? <Home /> : <Redirect to="/login" />

    };

    return (
        <div className="main">
            <Switch>
                <Route path="/login" render={showLogin}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" render={showHome}/>
            </Switch>
        </div>
    );
}

export default Main;