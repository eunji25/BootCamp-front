import React from "react";
import {
    TextField,
} from "@material-ui/core";
import {observer} from "mobx-react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {Button, InputLabel} from "@mui/material";
import Board from "../../../model/board/Board";

interface Props {
    open: boolean,
    onClickClose: () => void,
    onClickSave: () => void,
    detailBoard: Board | null;
}

const BoardDetailView = observer(
    ({
         open,
         onClickClose,
         onClickSave,
         detailBoard,
     }: Props) => {

        const style = {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };

        return (
            <>
                <div>
                    <Modal
                        open={open}
                        onClose={onClickClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} component="form">
                            <div>
                                <TextField fullWidth={true} id="outlined-search" label="작성자" type="search" name="writerId"
                                           value={detailBoard?.userName}/><br/><br/>
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
                                <TextField fullWidth={true} id="outlined-textarea" label="본문" type="search" name="content"
                                           multiline
                                           value={detailBoard?.content}/><br/>
                            </div>
                            <br/>
                            <Button onClick={onClickClose}>Close</Button>
                        </Box>
                    </Modal>
                </div>
            </>
        )
    });

export default BoardDetailView;