import React from "react";
import {
    Grid,
} from "@material-ui/core";

const Page = ({ children }) => {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} lg={4}>
                { children }
            </Grid>
        </Grid>
    )
}

export default Page;