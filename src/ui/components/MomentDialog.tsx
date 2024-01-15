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
import { ANTICLOCKWISE, CLOCKWISE, DOWN, M, UP } from "../../../consts";
import Beam from "../classes/Beam";
import { DialogContext } from "../views/Home";
import Select from "./Select";
import Moment from "../classes/Moment";

const MomentDialog = ({ }) => {


  const {
    mLDialog
  } = useContext(DialogContext);
  

  const {
    open,
    onToggle: handleClose,
  } = mLDialog;

  const magRef = React.createRef();
  const posRef = React.createRef();
  const [direction, setDirection] = useState(UP);

  const onChange = ({ target }) => {
    setDirection(target.value);
  }

  const handleAddLoad = () => {

    const mag = magRef.current.value;
    const pos = posRef.current.value;
    const l = new Moment(mag * 1, pos, direction);
    Beam.addLoad(l);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
    >
      <DialogTitle>Add Moment Load</DialogTitle>
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
                value: CLOCKWISE,
                name: "Clockwise",
              },
              {
                value: ANTICLOCKWISE,
                name: "Anti-Clockwise",
              }
            ]
          }
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

export default MomentDialog;
