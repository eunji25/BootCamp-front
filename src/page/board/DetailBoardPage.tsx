import React from "react";
import {observer, useLocalObservable} from "mobx-react";
import Board from "../../model/board/Board";
import {TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Container, Grid, Stack, Typography} from "@mui/material";
import Iconify from "../../layouts/icon/Iconify";
import BoardSearch from "./view/BoardSearch";
import BoardSort from "./view/BoardSort";
import BoardCard from "./view/BoardCard";
import BoardStore from "../../store/BoardStore";

interface Props {
}

const DetailBoardPage = observer(
    ({}: Props) => {

        const location = useLocation();
        const navigate = useNavigate();

        const detailBoard = location.state;
        const boardStore = useLocalObservable(() => BoardStore.instance);

        const handleClickDelete = async (e: any) => {
            const boardId = e.target.id;
            console.log(boardId)
            await boardStore.deleteBoard(boardId)
                .then(() => navigate("/board"));
        }

        return (
            <>
                <Container>
                    <Stack>
                        <Box component="form">
                            <div>
                                <TextField fullWidth={true} id="outlined-search" label="작성자" type="search"
                                           name="writerId"
                                           value={detailBoard?.userName}/><br/><br/>
                                <TextField fullWidth={true} label="작성일" type="search" name="registerTime"
                                           value={detailBoard?.registerTime}/><br/><br/>
                                <TextField fullWidth={true} label="수정일" type="search" name="registerTime"
                                           value={detailBoard?.modificationTime}/><br/><br/>
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
                    <Stack direction="row-reverse" mb={5}>
                        <Button variant="contained" style={{backgroundColor: "saddlebrown"}}
                                id={detailBoard.id}
                        onClick={handleClickDelete}>삭제</Button>
                        <Button variant="contained" style={{backgroundColor: "saddlebrown"}}>수정</Button>
                    </Stack>
                </Container>
            </>
        )
    }
)

export default DetailBoardPage;