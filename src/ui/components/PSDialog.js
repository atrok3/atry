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
import PinSupport from "../classes/PinSupport";
import { useFormik } from "formik";
import PosField from "./PosField";

const PSDialog = ({ }) => {


  const {
    pSDialog
  } = useContext(DialogContext);

  const {
    open,
    onToggle: handleClose,
  } = pSDialog;

  const formik = useFormik({
    initialValues: {
      pos: 0,
      index: "beamstart",
    }
  });


  const handleAddLoad = () => {

    const ps = new PinSupport({ ...formik.values });

    Beam.addLoad(ps);
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

export default PSDialog;
