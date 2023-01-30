import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Toolbar} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '120px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <>
            <Toolbar className={classes.root}
                     style={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                transition: "all 1s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <div>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-dark' href='https://github.com/eunji25'>
                    GitHub.com
                </a>
            </div>
            </Toolbar>
        </>
    )
}

export default Footer;