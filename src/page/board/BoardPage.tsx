import React, {useEffect} from "react";
import {Button, Container, Grid, Stack, Typography} from "@mui/material";
import Iconify from "../../layouts/icon/Iconify";
import BoardSearch from "./view/BoardSearch";
import BoardSort from "./view/BoardSort";
import BoardCard from "./view/BoardCard";
import {useLocalObservable} from "mobx-react";
import BoardStore from "../../store/BoardStore";
import {useNavigate} from "react-router-dom";

const SORT_OPTIONS = [
    {value: 'latest', label: 'Latest'},
    {value: 'popular', label: 'Popular'},
    {value: 'oldest', label: 'Oldest'},
];

interface Props {
    userId: string
}

const BoardPage = () => {
    const userData = localStorage.getItem('userData');
    const boardStore = useLocalObservable(() => BoardStore.instance);
    const {boardList} = boardStore;

    useEffect(() => {
        findBoardList();
    },[]);

    const findBoardList = () => {
        boardStore.findBoardList().then((r) => {}
        );
    }

    const navigate = useNavigate();

    const handleClickNewBoard = () => {
        navigate("/new-board");
    }

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                    </Typography>
                    <Button variant="contained" style={{backgroundColor: "saddlebrown"}}
                            startIcon={<Iconify icon="eva:plus-fill"/>}
                            onClick={handleClickNewBoard}
                    >
                        New Post
                    </Button>
                </Stack>

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <BoardSearch boardList={boardList}/>
                    <BoardSort options={SORT_OPTIONS}/>
                </Stack>

                <Grid container spacing={3}>
                    {boardList.map((board, index) => (
                        <BoardCard key={board.id} board={board} index={index} />
                    ))}
                </Grid>

            </Container>
        </>
    )
};

export default BoardPage;