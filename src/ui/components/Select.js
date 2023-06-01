import React from "react";
import {
  FormControl,
  MenuItem,
  Select as S
} from "@material-ui/core";

const Select = ({
    value,
    onChange,
    options
}) => {
    return (
        <FormControl
            variant="outlined"
            margin="normal"
            fullWidth
        >
            <S
                value={value}
                onChange={onChange}
            >
                {
                    options.map((option, i) => (
                        <MenuItem 
                            key={i}
                            value={option.value}
                        >
                            {option.name}
                        </MenuItem>
                    ))
                }
            </S>
        </FormControl>
    )
}

export default Select;