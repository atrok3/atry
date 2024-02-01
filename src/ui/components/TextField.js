import React from "react";
import {
    TextField as TF
} from "@material-ui/core";

const TextField = (props) => {

    const {
        formik,
        name,
        label,
    } = props;

    let _name = name || label.toLowerCase();

    let onChange = formik.handleChange;

    let value = formik.values[name];

    return(
        <TF
            { ...props }
            margin="normal"
            variant="outlined"
            type="number"
            name={_name}
            onChange={onChange}
            value={value}
            fullWidth
        />
    )
}

export default TextField;