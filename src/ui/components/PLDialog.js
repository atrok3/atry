import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import PointLoad from "../classes/PointLoad";
import TextField from "./TextField";
import { DOWN, UP } from "../../../consts";
import Beam from "../classes/Beam";
import { DialogContext } from "../views/Home";
import SelectDirections from "./SelectDirections";


const PLDialog = ({ }) => {


  const {
    pLDialog
  } = useContext(DialogContext);

  const {
    open,
    onToggle: handleClose,
  } = pLDialog;

  const magRef = React.createRef();
  const posRef = React.createRef();
  const [direction, setDirection] = useState(DOWN);

  const onChange = ({ target }) => {
    setDirection(target.value);
  }

  const handleAddLoad = () => {

    const mag = magRef.current.value;
    const pos = posRef.current.value;
    Beam.addLoad({ mag, pos, direction }, "PL");
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
    >
      <DialogTitle>Add Load</DialogTitle>
      <DialogContent>
        <TextField
          label="Magnitude"
          inputRef={magRef}
          fullWidth
        />
        <SelectDirections
          direction={direction}
          onChange={onChange}
        />
        <TextField
          label="Position"
          inputRef={posRef}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleAddLoad} color="primary" autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PLDialog;
