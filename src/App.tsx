import React, {useEffect, useState} from 'react'
import Router from './Route';
import {useNavigate} from "react-router-dom";
import {useLocalObservable} from "mobx-react";
import UserStore from "./store/UserStore";

function App() {
    // const userStore = useLocalObservable(() => UserStore.instance);
    // const {userData} = userStore;
    const [userData, setUserData] = useState<string>('');
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