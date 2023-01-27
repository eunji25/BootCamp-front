import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'mobx-react';
import UserStore from "./store/UserStore";

const userStateKeeper = new UserStore(); // 스토어 인스턴스 만들고

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider {...userStateKeeper}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)