import React from "react";
import {
    Toolbar,
    Grid,
    IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useLocation } from "react-router-dom";

const Backbar = () => {

    const history = useHistory();

    return (
        <header style={{ padding: "10px 2px" }}>
            <Toolbar style={{ display: "flex" }}>
                <IconButton onClick={history.goBack}>
                    <ArrowBackIcon />
                </IconButton>
            </Toolbar>
        </header>
    )
}

export default Backbar;