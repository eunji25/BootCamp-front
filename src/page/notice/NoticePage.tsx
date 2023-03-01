import React, {SyntheticEvent, useEffect, useState} from "react";
import {observer, useLocalObservable} from "mobx-react";
import NoticeStore from "../../store/NoticeStore";
import Notice from "../../model/notice/Notice";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Container,
    Modal,
    Stack,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {DataGrid, GridColDef, GridExpandMoreIcon} from "@mui/x-data-grid";
import Iconify from "../../layouts/icon/Iconify";
import NewNotice from "./NewNotice";

const NoticePage = observer(({}) => {
    const noticeStore = useLocalObservable(() => NoticeStore.instance);
    const [noticeList, setNoticeList] = useState<Notice[]>([]);

    useEffect(() => {
        noticeStore.findNoticeList()
            .then((res) => setNoticeList(res));
    }, []);

    const columns: GridColDef[] = [
        {field: 'noticeNo', headerName: 'NO'},
        {field: 'title', headerName: 'TITLE', width: 500},
        {field: 'userName', headerName: 'WRITER'},
        {field: 'registerTime', headerName: 'DATE', minWidth: 200}
    ];

    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => setOpen(false);

    const handleClickNew = () => {
        setOpen(true);
    }

    const [expanded, setExpended] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpended: boolean) => {
        setExpended(isExpended ? panel : false);
    };

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                    </Typography>
                    <Button variant="contained" style={{backgroundColor: "saddlebrown"}}
                            startIcon={<Iconify icon="eva:plus-fill"/>}
                            onClick={handleClickNew}
                    >
                        New Notice
                    </Button>
                </Stack>
                {noticeList.map(notice =>
                    <Accordion expanded={expanded === `${notice.noticeNo}`}
                               onChange={handleChange(`${notice.noticeNo}`)}>
                        <AccordionSummary
                            expandIcon={<GridExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header">
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                {notice.registerTime}
                            </Typography>

                            <Typography sx={{color: 'text.secondary'}}>
                                {notice.title}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Typography>
                                {notice.content}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )}
            </Container>

            {/*<Container>*/}
            {/*    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>*/}
            {/*        <Typography variant="h4" gutterBottom>*/}
            {/*        </Typography>*/}
            {/*        <Button variant="contained" style={{backgroundColor: "saddlebrown"}}*/}
            {/*                startIcon={<Iconify icon="eva:plus-fill"/>}*/}
            {/*                onClick={handleClickNew}*/}
            {/*        >*/}
            {/*            New Notice*/}
            {/*        </Button>*/}
            {/*    </Stack>*/}
            {/*<Box sx={{ height: 400, width: '100%' }}>*/}
            {/*    <DataGrid*/}
            {/*        rows={noticeList}*/}
            {/*        columns={columns}*/}
            {/*        pageSize={5}*/}
            {/*        rowsPerPageOptions={[5]}*/}
            {/*        experimentalFeatures={{ newEditingApi: true }}*/}
            {/*    />*/}
            {/*</Box>*/}
            {/*    {open &&*/}
            {/*    <Modal*/}
            {/*        open={open}*/}
            {/*        onClose={handleClose}*/}
            {/*        aria-labelledby="modal-modal-title"*/}
            {/*        aria-describedby="modal-modal-description"*/}
            {/*    >*/}
            {/*        <NewNotice*/}
            {/*            setOpen={setOpen}*/}
            {/*        />*/}
            {/*    </Modal>}*/}
            {/*</Container>*/}
        </>
    )
});

export default NoticePage;
