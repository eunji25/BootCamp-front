import React, {useEffect, useState} from "react";
import {Button, Container, Grid, Stack, Typography} from "@mui/material";
import Iconify from "../../layouts/icon/Iconify";
import BoardSearch from "./view/BoardSearch";
import BoardSort from "./view/BoardSort";
import BoardCard from "./view/BoardCard";
import {useLocalObservable} from "mobx-react";
import BoardStore from "../../store/BoardStore";
import {useNavigate} from "react-router-dom";
import UserStore from "../../store/UserStore";

const SORT_OPTIONS = [
    {value: 'latest', label: 'Latest'},
    {value: 'popular', label: 'Popular'},
    {value: 'oldest', label: 'Oldest'},
];

interface Props {
    userId: string
}

interface InputValue {
    id: string,
    writerId: string,
    title: string,
    content: string,
    registerTime: string,
}

const BoardPage = () => {
    const userData = localStorage.getItem('userData');
    const boardStore = useLocalObservable(() => BoardStore.instance);
    const {boardList} = boardStore;
    // const userStore = useLocalObservable(() => UserStore.instance);
    // const {userData} = userStore;

    useEffect(() => {
        findBoardList().then(r => {
        });
    },[]);

    const findBoardList = async () => {
        await boardStore.findBoardList();
    }

    // const [detailBoard, setDetailBoard] = useState<Board | null>(null);
    // const [openDetailBoard, setOpenDetailBoard] = useState<boolean>(false);
    //
    // const handleRowClick: GridEventListener<'rowClick'> = async (params) => {
    //     await findDetailBoard(params.row.boardNo)
    //     setOpenDetailBoard(true);
    // }
    //
    // const findDetailBoard = async (boardNo: string) => {
    //     await boardStateKeeper.findBoardByBoardNo(boardNo).then(r => {
    //         setDetailBoard(r.boards[0]);
    //     });
    // }
    //
    // const handleClickEdit = async () => {
    //     setEditable(true);
    //
    //     if (editable) {
    //         setEditable(false);
    //     }
    // }

    const navigate = useNavigate();

    const handleClickNewBoard = () => {
        navigate("/new-board");
    }

    //
    // const handleClickClose = () => {
    //     if (newBoardOpen) {
    //         setNewBoardOpen(false);
    //         setInputValue({...inputValue, id: '', writerId: '', title: '', content: '', registerTime: ''})
    //     } else if (openDetailBoard) {
    //         setOpenDetailBoard(false);
    //     }
    // }
    //

    //
    // const handleClickSave = () => {
    //
    // }

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {/*Board*/}
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