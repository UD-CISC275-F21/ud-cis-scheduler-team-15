import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                UD CIS Scheduler
                <p>Josh Watson </p>
                <p>Alex Rusin</p>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p>
                    Justin Tenerelli
                </p>
            </header>
        </div>
    );
}

export default App;
