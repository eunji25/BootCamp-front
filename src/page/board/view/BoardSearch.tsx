import React from "react";
import {Autocomplete, InputAdornment, Popper, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import Iconify from "../../../layouts/icon/Iconify";
import PropTypes from "prop-types";
import Board from "../../../model/board/Board";
import {observer} from "mobx-react";

const StyledPopper = styled((props) => <Popper open={false} placement="bottom-start" {...props} />)({
    width: '280px !important',
});

// BoardSearch.propTypes = {
//     posts: PropTypes.array.isRequired,
// };

interface Props {
    boardList: Board[];
}

const BoardSearch = observer(({
                                  boardList
                              }: Props) => {
    return (
        <>
            <Autocomplete
                sx={{width: 280}}
                autoHighlight
                popupIcon={null}
                PopperComponent={StyledPopper}
                options={boardList?.map(board => board.title)}
                // getOptionLabel={(board: Board) => board.boardRef?.title}
                // isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search post..."
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify icon={'eva:search-fill'}
                                             sx={{ml: 1, width: 20, height: 20, color: 'text.disabled'}}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </>
    )
});

export default BoardSearch;