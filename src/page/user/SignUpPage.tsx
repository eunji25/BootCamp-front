import React from "react";
import {styled} from "@mui/material/styles";
import {Container, Link, Stack, Typography} from "@mui/material";
import SignUpForm from "./view/SignUpForm";
import {ContentStyle} from "../../layouts/style/ContentStyle";
import {RootStyle} from "../../layouts/style/RootStyle";

const LoginPage = () => {

    return (
        <>
            <RootStyle>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <Typography variant="h4" gutterBottom>
                            Sign Up
                        </Typography>

                        <Typography variant="body2" sx={{mb: 5}}>
                        </Typography>

                        <Stack direction="row" spacing={2}>
                        </Stack>

                        <SignUpForm />

                    </ContentStyle>
                </Container>
            </RootStyle>
        </>
    )
}

export default LoginPage;