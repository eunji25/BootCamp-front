import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {observer, useLocalObservable} from "mobx-react";
import {Button, InputBase, Stack, TextField, Typography} from "@mui/material";
import Iconify from "../../layouts/icon/Iconify";
import Notice from "../../model/notice/Notice";
import NoticeStore from "../../store/NoticeStore";
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface InputValue {
    userName: string,
    title: string,
    content: string,
    registerTime: string,
}

interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>,
}

const NewNotice = observer((
    {
        setOpen,
     }: Props) => {

    // @ts-ignore
    const userData = JSON.parse(localStorage.getItem('userData'));
    const noticeStore = useLocalObservable(() => NoticeStore.instance);

    const [inputValue, setInputValue] = useState<InputValue>({
        userName: '', title:'', content: '', registerTime: '',
    })

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }


    const navigate = useNavigate();
    const handleClickSave = async () => {
        const newNotice = new Notice(
            '', new Date().toLocaleString(), '', 1, inputValue.title, inputValue.content, userData.email, userData.userName,
        )
        await noticeStore.newNotice(newNotice)
            .then(() => {
                setOpen(false);
                navigate('/notice');
                noticeStore.findNoticeList();
        });
    }

    return (
        <>
            <Stack sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    New Notice
                </Typography>
                <Stack style={{border: '1px'}}>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <Stack>
                            <TextField id="outlined-search" label="TITLE" type="search"
                                       name="title"
                                       value={inputValue.title}
                                       onChange={handleChangeInput}
                            /><br/>
                            <TextField id="outlined-search" label="CONTENT" type="search"
                                       name="content"
                                       value={inputValue.content}
                                       onChange={handleChangeInput}
                            /><br/>
                        </Stack>
                        <Stack>
                            <Button variant="contained" style={{backgroundColor: "saddlebrown"}}
                                    startIcon={<Iconify icon="eva:plus-fill"/>}
                                    onClick={handleClickSave}
                            >Save</Button>
                        </Stack>
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
});

export default NewNotice;
