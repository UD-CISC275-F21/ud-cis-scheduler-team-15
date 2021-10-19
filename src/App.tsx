import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {Welcome} from "./components/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";


function App(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                UD CIS Scheduler
                <p>Alex Rusin</p>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </header>
            <Welcome></Welcome>
        </div>
    );
}

export default App;
