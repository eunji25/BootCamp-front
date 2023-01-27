import React from "react";
import {MenuItem, TextField} from "@mui/material";
import PropTypes from "prop-types";

BoardSort.propTypes = {
    options: PropTypes.array,
    onSort: PropTypes.func,
};

export default function BoardSort({ options, onSort }: any) {
    return (
        <>
        <TextField select size="small" value="latest" onChange={onSort}>
            {options.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
        </>
    )
}