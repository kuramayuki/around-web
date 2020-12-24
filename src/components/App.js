import '../styles/App.css';
import TopBar from './TopBar';
import Main from './Main';
import React, {useState} from "react";
import {TOKEN_KEY} from '../constants';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY) ? true : false
    );
    const logout = () => {
        console.log("logout");
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    }

    const loggedIn = (token) => {
        console.log('token -> ', token);
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            setIsLoggedIn(true);
        }
    }

  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout}/>
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn}/>
    </div>
  );
}

export default App;
