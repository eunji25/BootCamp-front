import React from "react";
import {observer} from "mobx-react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

        userData = localStorage.getItem('userData');

        const classes = useStyles();
        const navigate = useNavigate();

        return (
            <>
                <div className={classes.root} style={{marginBottom: '40px'}}>
                    <AppBar position="static">
                        <Toolbar style={{backgroundColor: "rosybrown"}}>

                            <Typography variant="h6" className={classes.title}>
                                {title}
                            </Typography>
                            {typeof userData != 'undefined' && userData != null ?
                                <Button onClick={async () => {
                                    localStorage.clear();
                                    window.location.href = "/login"
                                }} variant="contained" size="medium" color="default" >로그아웃</Button>

                                :
                                <Button variant="contained" size="medium" color="default" onClick={() => navigate("/login")}>로그인</Button>
                            }

                        </Toolbar>

                        <Toolbar style={{backgroundColor: "rosybrown"}}>
                            <Button href={"/board"}> BOARD </Button>
                            <Button href={"/notice"}> NOTICE </Button>
                        </Toolbar>

                    </AppBar>
                </div>
            </>
        )
    });

export default Header;