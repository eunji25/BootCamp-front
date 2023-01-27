import React from "react";
import {observer} from "mobx-react";
import Board from "../../model/board/Board";
import {TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import {useLocation} from "react-router-dom";
import {Button, Container, Grid, Stack, Typography} from "@mui/material";
import Iconify from "../../layouts/icon/Iconify";
import BoardSearch from "./BoardSearch";
import BoardSort from "./BoardSort";
import BoardCard from "./BoardCard";

interface Props {
}

const DetailBoardPage = observer(
    ({}: Props) => {

        const location = useLocation();

        const detailBoard = location.state;

        return (
            <>
                <Container>
                    <Stack>
                        <Box component="form">
                            <div>
                                <TextField fullWidth={true} id="outlined-search" label="작성자" type="search"
                                           name="writerId"
                                           value={detailBoard?.userId}/><br/><br/>
                                <TextField fullWidth={true} label="작성일" type="search" name="registerTime"
                                           value={detailBoard?.registerTime}/><br/><br/>
                            </div>
                            <div>
                                <TextField fullWidth={true} id="outlined-textarea"
                                           multiline
                                           label="제목" type="search" name="title"
                                           value={detailBoard?.title}/><br/><br/>
                            </div>
                            <div>
                                <TextField fullWidth={true} id="outlined-textarea" label="본문" type="search"
                                           name="content"
                                           multiline
                                           value={detailBoard?.content}/><br/>
                            </div>
                            <br/>
                        </Box>
                    </Stack>
                </Container>
            </>
        )
    }
)

export default DetailBoardPage;