import { MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useField } from "formik";
import React from "react";
import { Input } from "reactstrap";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

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

export function MaterialTextInput({ name, label, ...props }) {
    const [field, meta] = useField(name);
    return (
        <TextField
            id={field.id}
            name={field.name}
            label={label}
            helperText={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...props}
        />
    );
}

export function MaterialNumberInput({ name, label, ...props }) {
    const [field, meta] = useField(name);
    return (
        <TextField
            id={field.id}
            name={field.name}
            label={label}
            helperText={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            inputProps={{ type: "number" }}
            {...props}
        />
    );
}

// TODO: add textfield props
export function MaterialDatePicker({ name, label, setFieldValue, ...props }) {
    const [field, meta] = useField(name);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
            <DatePicker
                label={label}
                value={field.value}
                onChange={(value) => {
                    setFieldValue(name, value, true);
                }}
                {...props}
            />
        </LocalizationProvider>
    );
}

export function MaterialSelectInput({ name, label, enumValue, ...props }) {
    const [field, meta] = useField(name);
    return (
        <TextField
            id={field.id}
            name={field.name}
            label={label}
            helperText={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            select
            {...props}>
            {Object.keys(enumValue).map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
}
