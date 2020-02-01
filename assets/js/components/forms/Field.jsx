import React from "react";
import {FormControl, Grid, Input, InputLabel} from "@material-ui/core";



const Field = ({name, label, value, onChange, type= "text", error= ""}) => {
    return (

        <Grid item xs={12}>
            <FormControl fullWidth={true} margin="dense">
                <InputLabel htmlFor="name">{label}</InputLabel>
                <Input
                    type={type}
                    name={name}
                    id={name}
                    aria-describedby="my-helper-text"
                    value={value}
                    onChange={onChange}
                    className={(error && "is-invalid")}
                />
                {error && <p className="invalid-feedback">{error}</p>}
            </FormControl>
        </Grid>

    );
};

export default Field;