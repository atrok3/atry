import React from "react";
import {
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const Navbar = ({ onClear, toggleBeamDialog, dialogs }) => {


    return(
        <header style={{padding: "2px 0px"}}>
            <Toolbar style={{display: "flex", justifyContent: "flex-end"}}>
                <div>
                    <IconButton onClick={dialogs.loadDialog.onToggle}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={dialogs.beamDialog.onToggle}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={onClear}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </header>
    )
}

export default Navbar;