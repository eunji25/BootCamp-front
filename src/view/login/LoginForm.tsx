import {redirect, useNavigate} from "react-router-dom";
import React, {ChangeEvent, useState} from "react";
import {Container, IconButton, InputAdornment, Link, Stack, TextField} from "@mui/material";
import Iconify from "../../layouts/icon/Iconify";
import {LoadingButton} from "@mui/lab";
import UserStore from "../../store/UserStore";
import {observer} from "mobx-react";

interface Props {
    loginInfo: { email: string, password: string },
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
    onClickLogin: () => void;
}

const LoginForm = observer(({
    loginInfo,
    onChangeInput,
    onClickLogin,
    }: Props) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Container>
            <Stack spacing={3}>
                <TextField name="email" value={loginInfo.email} label="EMAIL" onChange={onChangeInput}/>

                <TextField
                    name="password"
                    value={loginInfo.password}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChangeInput}
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
                    <Link variant="subtitle2" underline="hover">
                        Forgot password?
                    </Link>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onClickLogin}>
                    Sign In
                </LoadingButton>
            </Stack>
            </Container>
        </>
    )
});

export default LoginForm;