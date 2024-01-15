import React, { useContext } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
} from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { DialogContext } from "../views/Home";

const LoadItem = ({ option, }) => {


    const {
        loadDialog,
    } = useContext(DialogContext);

    const handleClick = () => {
        option.onClick();
        loadDialog.onToggle();
    }

    return (
        <ListItem
            button
            onClick={handleClick}
            disableGutters
        >
            <ListItemText
                primary={option.title}
            />
        </ListItem>
    )
}

const AddLoadDialog = () => {

    const {
        loadDialog,
        pLDialog,
        uDLDialog,
        mLDialog,
    } = useContext(DialogContext);

    return (
        <Dialog
            open={loadDialog.open}
            onClose={loadDialog.onToggle}
            scroll="body"
        >
            <DialogTitle>Add Load</DialogTitle>
            <DialogContent>
                <List>
                    {
                        [
                            {
                                title: "Point Load",
                                onClick: pLDialog.onToggle,
                            },
                            {
                                title: "Uniformly Distributed Load",
                                onClick: uDLDialog.onToggle,
                            },
                            {
                                title: "Moment Load",
                                onClick: mLDialog.onToggle,
                            }
                        ].map((option, i) => (
                            <LoadItem
                                key={i}
                                option={option}
                            />
                        ))
                    }
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default AddLoadDialog;
