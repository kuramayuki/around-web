import '../styles/App.css';
import TopBar from './TopBar';
import Main from './Main';
import React, {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const logout = () => {
        console.log("logout");
        setIsLoggedIn(false);
    }
  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout}/>
      <Main/>
    </div>
  );
}

export default App;
