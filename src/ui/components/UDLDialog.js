import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import PointLoad from "../classes/PointLoad";
import TextField from "./TextField";
import { DOWN, UP } from "../../../consts";
import Beam from "../classes/Beam";
import { DialogContext } from "../views/Home";
import Select from "./Select";
import UDL from "../classes/UDL";

const UDLDialog = ({ }) => {


  const {
    uDLDialog
  } = useContext(DialogContext);

  const {
    open,
    onToggle: handleClose,
  } = uDLDialog;

  const magRef = React.createRef();
  const posRef = React.createRef();
  const startPosRef = React.createRef();
  const [direction, setDirection] = useState(DOWN);

  const onChange = ({ target }) => {
    setDirection(target.value);
  }

  const handleAddLoad = () => {

    const mag = magRef.current.value;
    const pos = posRef.current.value;
    const startPos = startPosRef.current.value;
    const l = new UDL(mag * 1, startPos * 1, pos * 1, direction);
    Beam.addLoad(l);
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
        <Select
          value={direction}
          onChange={onChange}
          options={
            [
              {
                value: UP,
                name: "Up",
              },
              {
                value: DOWN,
                name: "Down",
              }
            ]
          }
        />
        <TextField
          label="Start Position"
          inputRef={startPosRef}
          fullWidth
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

export default UDLDialog;
