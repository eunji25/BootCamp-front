import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Button, Toolbar} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";

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
    userData: string | null,
}

const Header = observer(
    ({
         userData,
     }: Props) => {

        // @ts-ignore
        userData = JSON.parse(localStorage.getItem('userData'));

        const classes = useStyles();
        const navigate = useNavigate();

        const [navSize, setnavSize] = useState("10rem");
        const listenScrollEvent = () => {
            window.scrollY > 10 ? setnavSize("5rem") : setnavSize("9rem");
        };
        useEffect(() => {
            window.addEventListener("scroll", listenScrollEvent);
            return () => {
                window.removeEventListener("scroll", listenScrollEvent);
            };
        }, []);

        const [value, setValue] = React.useState('board');

        const handleChange = (event: React.SyntheticEvent, newValue: string) => {
            setValue(newValue);
            navigate(`/${newValue}`)
        };

        return (
            <>
                <div className={classes.root}
                     style={{marginBottom: '30px'}}>
                    <AppBar position="static">
                        <Toolbar style={{
                            backgroundColor: "rosybrown",
                            height: navSize,
                            paddingTop: "10px",
                            transition: "all 1s",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>

                            <Box sx={{ width: '40%', typography: 'body1'}}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange}
                                                 aria-label="lab API tabs example"
                                                 TabIndicatorProps={{
                                                    sx: {backgroundColor: "white"}
                                                 }}
                                        >
                                            <Tab label="BOARD" value="board" style={{color: "white"}} />
                                            <Tab label="NOTICE" value="notice" style={{color: "white"}} />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="board" ></TabPanel>
                                    <TabPanel value="notice"></TabPanel>
                                </TabContext>
                            </Box>

                            <Box m={1} justifyContent="end" >
                                {typeof userData != 'undefined' && userData != null ?
                                    <Button
                                        onClick={async () => {
                                        localStorage.clear();
                                        window.location.href = "/login"
                                    }}
                                        variant="outlined" size="medium" style={{color: "white", borderColor: "white"}}
                                    >로그아웃</Button>
                                    : <Button onClick={() => navigate("/login")}
                                              variant="outlined" size="medium" style={{color: "white", borderColor: "white"}}
                                    >로그인</Button>
                                }
                            </Box>

                        </Toolbar>
                    </AppBar>
                </div>
            </>
        )
    });

export default Header;