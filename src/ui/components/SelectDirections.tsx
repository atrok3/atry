import React from "react";
import { DOWN, UP } from "../../../consts";
import Select from "./Select";

export interface SelectDirections {
    direction: string
    onChange: () => void
}


const SelectDirections = ({
    ...others
}) => {

    let name = "direction";

    const {
        formik
    } = others;

    let onChange = formik.handleChange;

    let value = formik.values[name]


    return (
        <Select
            name={name}
            formik={formik}
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