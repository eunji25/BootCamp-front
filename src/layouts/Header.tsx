import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'sticky',
        top: 0,
        'background-color': 'white',
        'z-index': '10',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

interface Props {
    title: string,
    userData: string | null,
}

const Header = observer(
    ({
         title,
         userData,
     }: Props) => {

        // @ts-ignore
        userData = JSON.parse(localStorage.getItem('userData'));

        const classes = useStyles();
        const navigate = useNavigate();

        const [navSize, setnavSize] = useState("10rem");
        const [navColor, setnavColor] = useState("transparent");
        const listenScrollEvent = () => {
            window.scrollY > 10 ? setnavColor("#252734") : setnavColor("transparent");
            window.scrollY > 10 ? setnavSize("2rem") : setnavSize("10rem");
        };
        useEffect(() => {
            window.addEventListener("scroll", listenScrollEvent);
            return () => {
                window.removeEventListener("scroll", listenScrollEvent);
            };
        }, []);

        return (
            <>
                <div className={classes.root}
                     style={{marginBottom: '40px'}}>
                    <AppBar position="static">
                        <Toolbar style={{
                            backgroundColor: "rosybrown",
                            height: navSize,
                            transition: "all 1s",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>

                            {/*<Typography variant="h6" className={classes.title}>*/}
                            {/*    {title}*/}
                            {/*</Typography>*/}
                            <Box>
                                <Button href={"/board"}> BOARD </Button>
                                <Button href={"/notice"}> NOTICE </Button>
                            </Box>
                            <Box m={1}
                                 display="flex"
                                 justifyContent="flex-start"
                                 alignItems="flex-start">
                                {typeof userData != 'undefined' && userData != null ?
                                    <Button onClick={async () => {
                                        localStorage.clear();
                                        window.location.href = "/login"
                                    }} variant="contained" size="medium" color="default">로그아웃</Button>

                                    :
                                    <Button variant="contained" size="medium" color="default"
                                            onClick={() => navigate("/login")}>로그인</Button>
                                }
                            </Box>

                        </Toolbar>

                        {/*<Toolbar style={{backgroundColor: "rosybrown"}}>*/}

                        {/*</Toolbar>*/}

                    </AppBar>
                </div>
            </>
        )
    });

export default Header;