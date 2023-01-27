import React, {ChangeEvent, useState} from "react";
import {Container, Link, Stack, Typography} from "@mui/material";
import LoginForm from "./LoginForm";
import {observer} from "mobx-react";
import {redirect, useNavigate} from "react-router-dom";
import UserStore from "../../store/UserStore";
import {ContentStyle} from "../../layouts/style/ContentStyle";

interface LoginInfo {
    email: string,
    password: string,
}

interface Props {
}

const LoginPage = observer(({}: Props) => {

    const navigate = useNavigate();

    const userStateKeeper = UserStore.instance;

    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        email: '', password: ''
    })

    const handleClickLogin = async () => {
        const res = await userStateKeeper.login(loginInfo.email, loginInfo.password)
        if (res) {
            localStorage.setItem('userData', JSON.stringify({
                userName: res.userName,
                email: res.email,
            }));
            navigate("/board");
        } else {
            window.alert("LOGIN FAILED");
            redirect("/login");
        }
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value,
        })
    }

    return (
        <>
            <Container maxWidth="sm">
                <ContentStyle>
                    <Typography variant="h4" gutterBottom>
                        Sign In
                    </Typography>

                    <Typography variant="body2" sx={{mb: 5}}>
                        Don’t have an account? {''}
                        <Link variant="subtitle2" href={'/signup'}>Get started</Link>
                    </Typography>

                    <Stack direction="row" spacing={2}>
                    </Stack>

                    <LoginForm
                        loginInfo={loginInfo}
                        onChangeInput={handleChangeInput}
                        onClickLogin={handleClickLogin}
                    />

                </ContentStyle>
            </Container>

        </>
    )
});

export default LoginPage;