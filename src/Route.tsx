import React from "react";
import {Routes, Route} from "react-router-dom";
import BoardPage from "./view/board/BoardPage";
import LoginPage from "./view/login/LoginPage";
import DetailBoardPage from "./view/board/DetailBoardPage";
import NoticePage from "./view/notice/NoticePage";
import Header from "./layouts/Header";
import NewBoardPage from "./view/board/NewBoardPage";
import {Container} from "@mui/material";

const Router = ({userData, setUserData}: any) => {
    userData = localStorage.getItem('userData');

    const logout = () => {
        localStorage.clear();
        setUserData(undefined);
        window.location.href = "/login"
    }

    return (
        <>
            <Header title={"Main"} userData={userData} />
            {!userData &&
                <div>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                    </Routes>
                </div>
            }
            {userData &&
                <Container>
                    <Routes>
                        <Route path="/board" element={<BoardPage/>}/>
                        <Route path="/detail-board" element={<DetailBoardPage/>}/>
                        <Route path="/new-board" element={<NewBoardPage/>}/>
                        <Route path="/notice" element={<NoticePage/>}/>
                    </Routes>
                </Container>
            }
        </>
    )
}

export default Router;
