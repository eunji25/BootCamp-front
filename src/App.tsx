import React, {useEffect, useState} from 'react'
import Router from './Route';
import Header from "./layouts/Header";
import {useNavigate} from "react-router-dom";

function App() {
    const [userData, setUserData] = useState();
    // @ts-ignore
    const loginData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData && loginData) {
            setUserData(loginData);
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="App">
                <Router userData={userData} setUserData={setUserData}/>
        </div>
    )
}

export default App;