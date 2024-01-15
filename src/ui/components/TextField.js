import React from "react";
import {
    TextField as TF
} from "@material-ui/core";

const TextField = (props) => {

    return(
        <TF
            { ...props }
            margin="normal"
            variant="outlined"
            fullWidth
            type="number"
        />
    )
}

export default TextField;