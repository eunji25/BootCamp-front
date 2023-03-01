import React, {ChangeEvent, useState} from "react";
import {
    Button,
    TextField,
} from "@material-ui/core";
import {observer, useLocalObservable} from "mobx-react";
import {Container, Stack} from "@mui/material";
import BoardCdo from "../../model/board/sdo/BoardCdo";
import BoardStore from "../../store/BoardStore";
import {useNavigate} from "react-router-dom";

interface Props {
}

interface InputValue {
    userName: string,
    title: string,
    content: string,
    registerTime: string,
}

const NewBoardPage = observer(
    ({}: Props) => {

        // @ts-ignore
        const userData = JSON.parse(localStorage.getItem('userData'));
        const boardStore = useLocalObservable(() => BoardStore.instance);
        const [editable, setEditable] = useState<boolean>(false);
        const [inputValue, setInputValue] = useState<InputValue>({
            userName: '', title: '', content: '', registerTime: new Date().toLocaleString()
        })

        const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setInputValue({
                ...inputValue,
                [name]: value,
            });
        }

        const [image, setImage] = useState<string>("");

        const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

            const selectedImage = e.target.files![0];
            const reader = new FileReader();
            reader.readAsDataURL(selectedImage);
            // 이미지 미리보기
            reader.onloadend = () => {
                // @ts-ignore
                setImage(reader.result);
            }
        }

        const navigate = useNavigate();

        const handleClickSaveNewBoard = async () => {
            setEditable(false);
            const boardCdo = new BoardCdo('', inputValue.registerTime, '',
                1, inputValue.title, inputValue.content,
                userData.email, image, userData.userName
            )
            await boardStore.newBoard(boardCdo)
                .then(() => {
                    navigate("/board");
                    boardStore.findBoardList();
                });
        }

        return (
            <>
                <Container>
                    <Stack>
                        <img style={{width: '80vh', height: '30vh'}} src={image} hidden={!image}/>
                        <br/>
                        <input id="raised-button-file" type="file"
                               onChange={handleImageUpload}/>
                    </Stack>
                    <br/><br/>
                    <Stack>
                        <TextField id="outlined-search" label="작성자" type="search"
                                   inputProps={
                                       {readOnly: true,}
                                   }
                                   name="writerId"
                                   value={userData.userName}
                                   onChange={handleChangeInput}
                        /><br/>
                        <TextField id="outlined-search" label="작성일" type="search"
                                   inputProps={
                                       {readOnly: true,}
                                   }
                                   name="registerTime"
                                   value={inputValue.registerTime}
                                   onChange={handleChangeInput}
                        /><br/>
                    </Stack>

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

                </Container>
            </>
        )
    });

export default NewBoardPage;
