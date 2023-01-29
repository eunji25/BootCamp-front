import React, {useState} from "react";
import {Avatar, Box, Card, CardContent, Grid, Link, Typography} from "@mui/material";
import SvgColor from "../../../layouts/style/SvgColor";
import {alpha} from "@mui/material/styles";
import {observer, useLocalObservable} from "mobx-react";
import Board from "../../../model/board/Board";
import BoardStore from "../../../store/BoardStore";
import {useNavigate} from "react-router-dom";
import {StyledAvatar, StyledCardMedia, StyledCover, StyledInfo, StyledTitle} from "../../../layouts/style/CardStyle";

interface Props {
    board: Board | null;
    index: number,
}

const BoardCard = observer(({
        board, index
    }: Props) => {

    const latestPostLarge = index === 0;
    const latestPost = index === 1 || index === 2;

    const boardStateKeeper = useLocalObservable(() => BoardStore.instance);

    const navigate = useNavigate();

    const handleClickCard = (e: any) => {
        boardStateKeeper.findDetailBoard(e.target.id)
            .then(() => {
                    navigate('/detail-board', {
                        state: {
                            id: `${board?.id}`,
                            registerTime: `${board?.registerTime}`,
                            modificationTime: `${board?.modificationTime}`,
                            boardNo: `${board?.boardNo}`,
                            title: `${board?.title}`,
                            content: `${board?.content}`,
                            userName: `${board?.userName}`,
                        }
                    });
                }
            );
    }

    return (
        <>
            <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
                <Card sx={{position: 'relative'}}>
                    <StyledCardMedia
                        sx={{
                            ...((latestPostLarge || latestPost) && {
                                pt: 'calc(100% * 4 / 3)',
                                '&:after': {
                                    top: 0,
                                    content: "''",
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                                },
                            }),
                            ...(latestPostLarge && {
                                pt: {
                                    xs: 'calc(100% * 4 / 3)',
                                    sm: 'calc(100% * 3 / 4.66)',
                                },
                            }),
                        }}
                    >
                        <SvgColor
                            color="paper"
                            src="/assets/icons/shape-avatar.svg"
                            sx={{
                                width: 80,
                                height: 36,
                                zIndex: 9,
                                bottom: -15,
                                position: 'absolute',
                                color: 'background.paper',
                                ...((latestPostLarge || latestPost) && {display: 'none'}),
                            }}
                        />
                        <StyledAvatar
                            // alt={author.name}
                            // src={author.avatarUrl}
                            sx={{
                                ...((latestPostLarge || latestPost) && {
                                    zIndex: 9,
                                    top: 24,
                                    left: 24,
                                    width: 40,
                                    height: 40,
                                }),
                            }}
                        />

                        <StyledCover alt={board?.image} />
                    </StyledCardMedia>

                    <CardContent
                        sx={{
                            pt: 4,
                            ...((latestPostLarge || latestPost) && {
                                bottom: 0,
                                width: '100%',
                                position: 'absolute',
                            }),
                        }}
                    >
                        <Typography gutterBottom variant="caption" sx={{color: 'text.disabled', display: 'block'}}>
                            {/*{fDate(createdAt)}*/}
                        </Typography>
                        <StyledTitle
                            color="inherit"
                            variant="subtitle2"
                            underline="hover"
                            sx={{
                                ...(latestPostLarge && {typography: 'h5', height: 60}),
                                ...((latestPostLarge || latestPost) && {
                                    color: 'common.white',
                                }),
                            }}
                            onClick={handleClickCard}
                        >
                            {board!.title}

                        </StyledTitle>

                        {/*<StyledInfo>*/}
                        {/*</StyledInfo>*/}

                    </CardContent>
                </Card>

            </Grid>
        </>
    )
});

export default BoardCard;