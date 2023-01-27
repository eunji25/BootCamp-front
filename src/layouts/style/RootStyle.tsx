import {styled} from "@mui/material/styles";

export const RootStyle = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));