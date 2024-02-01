import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Grid,
} from "@material-ui/core";
import PointLoad from "../classes/PointLoad";
import TextField from "./TextField";
import { DOWN, UP } from "../../../consts";
import Beam from "../classes/Beam";
import { DialogContext } from "../views/Home";
import SelectDirections from "./SelectDirections";
import Select from "./Select";
import { useFormik } from "formik";
import PosField from "./PosField";


const PLDialog = ({ }) => {


  const {
    pLDialog
  } = useContext(DialogContext);

  const {
    open,
    onToggle: handleClose,
  } = pLDialog;

  const formik = useFormik({
    initialValues: {
      mag: 0,
      direction: DOWN,
      pos: 0,
      index: "beamstart",
    }
  });

  const handleAddLoad = () => {

    const l = new PointLoad({ ...formik.values });

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
          formik={formik}
          label="Magnitude"
          name="mag"
          fullWidth
        />
        <SelectDirections
          formik={formik}
        />
        <PosField
          formik={formik}
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
