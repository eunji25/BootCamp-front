import React, {ChangeEvent, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import {observer, useLocalObservable} from "mobx-react";
import {Box, Container, InputLabel, Modal} from "@mui/material";
import BoardCdo from "../../model/board/sdo/BoardCdo";
import BoardStore from "../../store/BoardStore";
import {useNavigate} from "react-router-dom";

interface Props {
}

interface InputValue {
    id: string,
    writerId: string,
    title: string,
    content: string,
    registerTime: string,
}

const NewBoardPage = observer(
    ({
     }: Props) => {

        // @ts-ignore
        const userData = JSON.parse(localStorage.getItem('userData'));
        const boardStateKeeper = useLocalObservable(() => BoardStore.instance);
        const [editable, setEditable] = useState<boolean>(false);
        const [inputValue, setInputValue] = useState<InputValue>({
            id: '', writerId: '', title: '', content: '', registerTime: new Date().toDateString()
        })

        const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setInputValue({
                ...inputValue,
                [name]: value,
            });
        }

        const navigate = useNavigate();

        const handleClickSaveNewBoard = async () => {
            setEditable(false);
            const boardCdo = new BoardCdo('', inputValue.registerTime, '', '',
                inputValue.title,
                inputValue.content, userData.email, userData.userName
            )
            await boardStateKeeper.newBoard(boardCdo)
                .then(() => {
                    navigate("/board");
                    boardStateKeeper.findBoardList();
                });
        }

        return (
            <>
                <div>

                    {/*<input accept="image/*" id="raised-button-file" type="file"*/}
                    {/*       file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>*/}

                    {/*<label htmlFor="raised-button-file">*/}

                    {/*<Button variant="contained" color="primary" component="span" name="file">*/}

                    {/*{this.state.fileName === '' ? "프로필 이미지 선택" : this.state.fileName}*/}

                    {/*</Button>*/}
                    <div>
                        {/*<TextField hidden={true} name="id" value={inputValue.id} disabled={true}/><br/>*/}

                        <div>
                            <TextField id="outlined-search" label="작성자" type="search"
                                       inputProps={
                                           {readOnly: true,}
                                       }
                                name="writerId"
                                value={userData.userName}
                                onChange={handleChangeInput}
                            /><br/><br/>
                            <TextField id="outlined-search" label="작성일" type="search"
                                       inputProps={
                                           {readOnly: true,}
                                       }
                                       name="registerTime"
                                value={inputValue.registerTime}
                                onChange={handleChangeInput}
                            /><br/><br/>
                        </div>

                        <TextField fullWidth={true} id="outlined-textarea" label="제목" type="search"
                                   name="title"
                            value={inputValue.title}
                            onChange={handleChangeInput}
                        /><br/><br/>

                        <TextField fullWidth={true} id="outlined-multiline-static" label="본문" type="search"
                                   multiline
                                   name="content"
                            value={inputValue.content}
                            onChange={handleChangeInput}
                        /><br/><br/>


                        <Button variant="contained"
                            onClick={handleClickSaveNewBoard}
                        >Save</Button>

                    </div>
                </div>
            </>
        )
    });

export default NewBoardPage;