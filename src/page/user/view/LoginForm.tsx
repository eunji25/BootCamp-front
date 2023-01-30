import React, {ChangeEvent, useState} from "react";
import {Container, IconButton, InputAdornment, Link, Stack, TextField} from "@mui/material";
import Iconify from "../../../layouts/icon/Iconify";
import {LoadingButton} from "@mui/lab";
import {observer} from "mobx-react";

interface Props {
    loginInfo: { email: string, password: string },
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
    onEnterPress: (e: any) => void;
    onClickLogin: () => void;
}

const LoginForm = observer(({
    loginInfo,
    onChangeInput,
    onEnterPress,
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
                    onKeyPress={onEnterPress}
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

                <LoadingButton fullWidth size="large" type="submit"
                               variant="contained" onClick={onClickLogin}
                               style={{backgroundColor: "saddlebrown"}}
                >
                    Sign In
                </LoadingButton>
            </Stack>
            </Container>
        </>
    )
});

export default LoginForm;