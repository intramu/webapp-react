import React from "react";
import { Link } from "react-router-dom";
// ! REVISIT - this is a project setup issue
// import logo from "./logo.svg";
import "./styles/App.css";
import LoginButton from "./components/LoginButton";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* // ! REVISIT - bring back after issue above is resolved */}
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <p>
                    Welcome to the temporary landing page of Intramu
                    <br />
                    Please login to access the website.
                </p>
                <LoginButton />
                <Link to="/dashboard">Dashboard</Link>
                <img src="/logo.png" alt="octopus" />
                <p>wow</p>
            </header>
        </div>
    );
}

export default App;
