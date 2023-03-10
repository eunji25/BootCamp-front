import React, {ChangeEvent, useState} from "react";
import {observer, useLocalObservable} from "mobx-react";
import {TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Container, Stack} from "@mui/material";
import BoardStore from "../../store/BoardStore";
import BoardCdo from "../../model/board/sdo/BoardCdo";

interface Props {
}

interface InputValue {
    title: string,
    content: string,
    image: string,
}

const DetailBoardPage = observer(
    ({}: Props) => {

        // @ts-ignore
        const userData = JSON.parse(localStorage.getItem('userData'));
        const location = useLocation();
        const navigate = useNavigate();

        const detailBoard = location.state;
        const boardStore = useLocalObservable(() => BoardStore.instance);


        const [editable, setEditable] = useState<boolean>(false);
        const [inputValue, setInputValue] = useState<InputValue>({
            title: detailBoard.title, content: detailBoard.content, image: detailBoard.image
        });

        const handleClickModify = async (e: any) => {
            if (!editable) {
                setEditable(true);
            } else {
                const boardCdo = new BoardCdo(detailBoard.id,
                    detailBoard.registerTime, new Date().toLocaleString(),
                    detailBoard.boardNo, inputValue.title, inputValue.content,
                    detailBoard.email, image ? image : detailBoard.image,
                    detailBoard.userName);
                await boardStore.modifyBoard(boardCdo)
                    .then(() => {
                        window.alert("MODIFIED");
                        navigate("/board")
                    });
                setEditable(false);
            }
        }

        const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
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
            // ????????? ????????????
            reader.onloadend = () => {
                // @ts-ignore
                setImage(reader.result);
            }
        }

        const handleClickDelete = async (e: any) => {
            const boardId = e.target.id;
            await boardStore.deleteBoard(boardId)
                .then(() => navigate("/board"));
        }

        console.log(editable)

        return (
            <>
                <Container>
                    <Stack>
                        <img style={{width: '90vh', height: '50vh'}} src={image ? image : detailBoard.image}
                             hidden={(editable && !image && !detailBoard.image) || (!editable && !detailBoard.image)}/>
                        <br/>
                        <input id="raised-button-file" type="file"
                               onChange={handleImageUpload} hidden={!editable}/>
                        <Box component="form">
                            <br/><br/>
                            <div>
                                <TextField fullWidth={true} id="outlined-search" label="?????????" type="search"
                                           name="userName"
                                           value={detailBoard?.userName}/><br/><br/>
                                <TextField label="?????????" type="search" name="registerTime" variant="outlined"
                                           value={detailBoard?.registerTime}/>
                                <TextField label="?????????" type="search" name="modificationTime" variant="outlined"
                                           value={detailBoard?.modificationTime}
                                /><br/><br/>
                            </div>
                            <div>
                                <TextField fullWidth={true} id="outlined-textarea"
                                           multiline
                                           onChange={handleChangeInput}
                                           label="??????" type="search" name="title"
                                           value={editable ? inputValue.title : detailBoard?.title}
                                /><br/><br/>
                            </div>
                            <div>
                                <TextField fullWidth={true} id="outlined-textarea" label="??????" type="search"
                                           name="content"
                                           multiline
                                           onChange={handleChangeInput}
                                           value={editable ? inputValue.content : detailBoard?.content}/><br/>
                            </div>
                            <br/>
                        </Box>
                    </Stack>
                    {!editable &&
                    <Stack direction="row" mb={5} style={{marginBottom: '0px'}}>
                        <Button variant="outlined" style={{color: "saddlebrown"}}
                        onClick={() => navigate("/board")}>??????</Button>
                    </Stack>
                    }
                    {/* ?????? ?????? */}
                    {(userData.email == detailBoard.email) &&
                        <Stack direction="row-reverse" mb={5}>

                            <Button variant="outlined" style={{color: "saddlebrown"}}
                                    id={detailBoard.id}
                                    onClick={handleClickDelete}
                            >??????</Button>
                            <Button variant="outlined" style={{color: "saddlebrown"}}
                                    id={detailBoard.id}
                                    onClick={handleClickModify}>{editable ? "??????" : "??????"}</Button>
                        </Stack>
                    }
                </Container>
            </>
        )
    }
)

export default DetailBoardPage;