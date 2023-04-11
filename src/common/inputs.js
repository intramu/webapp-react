import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useField } from "formik";
import React from "react";
import { Input, Label } from "reactstrap";

/* eslint-disable react/jsx-props-no-spreading */
export function TextInput(props) {
    const [field, meta] = useField(props);
    const { id, name, label } = props;
    return (
        <>
            {/* <Label htmlFor={id || name}>{label}</Label> */}
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
}

export function SelectInput(props) {
    const [field, meta] = useField(props);
    const { id, name, label } = props;
    return (
        <>
            {/* <Label htmlFor={id || name}>{label}</Label> */}

            <Input type="select" {...field} {...props} />

            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
}

export function MaterialTextInput({ name, ...props }) {
    const [field, meta] = useField(name);
    return (
        <>
            {/* <Label htmlFor={id || name}>{label}</Label> */}
            <TextField
                id={field.id}
                name={field.name}
                helperText={meta.touched ? meta.error : ""}
                error={meta.touched && Boolean(meta.error)}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                {...props}
            />
        </>
    );
}

export function MaterialDatePicker({ name, ...props }) {
    const [field, meta] = useField(name);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DatePicker
                label="Date of Birth"
                value={field.value}
                onChange={(value) => {
                    props.setFieldValue(name, value, true);
                }}
                {...props}
            />
        </LocalizationProvider>
    );
}
