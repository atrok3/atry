import React from "react";
import { DOWN, UP } from "../../../consts";
import Select from "./Select";

export interface SelectDirections {
    direction: string
    onChange: () => void
}


const SelectDirections = ({
    direction,
    onChange,
}) => {
    return (
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
    )
}

export default SelectDirections;