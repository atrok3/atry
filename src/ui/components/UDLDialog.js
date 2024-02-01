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
import PosField from "./PosField";
import { useFormik } from "formik";
import SelectDirections from "./SelectDirections";

const UDLDialog = ({ }) => {


  const {
    uDLDialog
  } = useContext(DialogContext);

  const {
    open,
    onToggle: handleClose,
  } = uDLDialog;

  const formik = useFormik({
    initialValues: {
      mag: 0,
      direction: DOWN,
      pos: 0,
      startPos: 0,
      index: "beamstart",
    }
  });

  const handleAddLoad = () => {

    let op = { ...formik.values };

    const l = new UDL({ ...op, startPos: formik.values.pos, pos: formik.values.endPos });

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
          name="mag"
          formik={formik}
          fullWidth
        />
        <SelectDirections
          formik={formik}
        />
        <PosField
          label="Start Position"
          formik={formik}
          fullWidth
        />
        <TextField
          label="Span"
          name="endPos"
          formik={formik}
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
