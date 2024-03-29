import React, { useContext, useState } from "react";
import Beam from "../classes/Beam";
import Select from "./Select";

import {
    Grid,
} from "@material-ui/core";
import TextField from "./TextField";

const PosField = ({ formik }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Select
                    fullWidth
                    options={Beam.getBeamOptions()}
                    formik={formik}
                    name="index"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Distance from reference"
                    name="pos"
                    formik={formik}
                    fullWidth
                />
            </Grid>
        </Grid>
    )
}

export default PosField;