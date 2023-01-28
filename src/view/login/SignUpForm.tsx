import {useNavigate} from "react-router-dom";
import React, {ChangeEvent, useState} from "react";
import {Container, IconButton, InputAdornment, Link, Stack, TextField} from "@mui/material";
import Iconify from "../../layouts/icon/Iconify";
import {LoadingButton} from "@mui/lab";
import UserStore from "../../store/UserStore";
import {observer} from "mobx-react";
import UserCdo from "../../model/user/sdo/UserCdo";
import ERole from "../../model/user/vo/ERole";

interface Props {

}

interface LoginInfo {
    email: string,
    password: string,
}

interface SignUp {
    userName: string,
    email: string,
    roles: string,
    password: string,
}

const LoginForm = observer(({}: Props) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const userStateKeeper = UserStore.instance;

    const [signUp, setSignUp] = useState<SignUp>({
        userName: '', email: '', roles: '', password: ''
    })

    const handleClickSignUp = async () => {
        const newUserCdo = new UserCdo('', signUp.userName, signUp.email, ERole.USER, signUp.password);
        await userStateKeeper.newUser(newUserCdo).then((res) => {
            window.alert("SIGN UP SUCCESS");
            navigate('/login');
        });
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUp({
            ...signUp,
            [name]: value,
        })
    }

    return (
        <>
            <Container>
            <Stack spacing={3}>
                <TextField name="userName" value={signUp.userName} label="NAME" onChange={handleChangeInput}/>
                <TextField name="email" value={signUp.email} label="EMAIL" onChange={handleChangeInput}/>

                <TextField
                    name="password"
                    value={signUp.password}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChangeInput}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClickSignUp}>
                    Sign Up
                </LoadingButton>
            </Stack>
            </Container>
        </>
    )
});

export default LoginForm;