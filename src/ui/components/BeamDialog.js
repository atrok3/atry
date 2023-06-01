import React, { useContext } from "react";
import {
  Grid,
} from "@material-ui/core";
import Beam from "../classes/Beam";
import TextField from "./TextField";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { DialogContext } from "../views/Home";

const Lengthbar = ({ onClear }) => {

  const {
    beamDialog,
  } = useContext(DialogContext);

  const [state, setState] = React.useState({
    length: 8,
    s1: 0,
    s2: 8,
  });

  const onChangeBeamLength = (value) => {
    Beam.len = value * 1;
  }

  const onChangeSupportLength = (support, value) => {
    support.setOffset(value * 1);
  }

  const onChangeSupport1Length = (value) => onChangeSupportLength(Beam.s1, value)

  const onChangeSupport2Length = (value) => onChangeSupportLength(Beam.s2, value)

  const onUpdate = () => {
    const {
      length,
      s1,
      s2,
    } = state;

    onChangeBeamLength(length);
    onChangeSupport1Length(s1);
    onChangeSupport2Length(s2);
    onClear();
    Beam.drawMarked(s1, s2);
    beamDialog.onToggle();
  }

  const onChange = ({ target }) => {
    const {
      name,
      value
    } = target;
    setState({ ...state, [name]: value });
  }

  const {
    s1,
    length,
    s2,
  } = state;


  return (
    <Dialog
      open={beamDialog.open}
      onClose={beamDialog.onToggle}
      scroll="body"
    >
      <DialogTitle>Edit Beam</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            label="Beam Length"
            value={length}
            onChange={onChange}
            name="length"

          />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Support 1"
              value={s1}
              onChange={onChange}
              name="s1"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Support 2"
              value={s2}
              onChange={onChange}
              name="s2"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={beamDialog.onToggle} color="secondary">
          Close
        </Button>
        <Button onClick={onUpdate} color="primary" autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Lengthbar;