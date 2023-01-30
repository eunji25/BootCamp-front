import React from "react";
import {Routes, Route} from "react-router-dom";
import BoardPage from "./page/board/BoardPage";
import LoginPage from "./page/user/LoginPage";
import DetailBoardPage from "./page/board/DetailBoardPage";
import NoticePage from "./page/notice/NoticePage";
import Header from "./layouts/Header";
import NewBoardPage from "./page/board/NewBoardPage";
import {Container} from "@mui/material";
import SignUpPage from "./page/user/SignUpPage";
import Footer from "./layouts/Footer";

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
                        <Route path="/signup" element={<SignUpPage/>}/>
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
            <Footer />
        </>
    )
}

export default Router;
