import React from "react";
import { useContext } from "react";
import {
    Dialog,
    DialogContent,
} from "@material-ui/core";
import { DialogContext } from "../views/Home";
import { CircularProgress } from "@material-ui/core";

const ActivityDialog = ({ onClear }) => {

    const {
        activityDialog,
    } = useContext(DialogContext);

    return (
        <Dialog
            open={activityDialog.open}
            scroll="body"
        >
            <DialogContent>
                <CircularProgress
                />
            </DialogContent>
        </Dialog>
    )
}

export default ActivityDialog;