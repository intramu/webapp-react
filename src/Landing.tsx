import React from "react";
import "./styles/App.css";
import LoginButton from "./components/LoginButton";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Welcome to the temporary landing page of Intramu
                    <br />
                    Please login to access the website.
                </p>
                <LoginButton />
                <img className="App-logo" src="/logo192.png" alt="octopus" />
            </header>
        </div>
    );
}

export default App;
