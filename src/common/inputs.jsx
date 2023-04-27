import React from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useField } from "formik";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/* eslint-disable react/jsx-props-no-spreading */
export function TextInput(props) {
    const [field, meta] = useField(props);
    // const { id, name, label } = props;
    return (
        <>
            {/* <Label htmlFor={id || name}>{label}</Label> */}
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
}

// export function SelectInput(props) {
//     const [field, meta] = useField(props);
//     const { id, name, label } = props;
//     return (
//         <>
//             {/* <Label htmlFor={id || name}>{label}</Label> */}

//             <Input type="select" {...field} {...props} />

//             {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
//         </>
//     );
// }

export function MaterialTextInput({ name, label, ...props }) {
    const [field, meta] = useField(name);
    return (
        <TextField
            css={{ borderRadius: 15 }}
            id={field.id}
            name={field.name}
            label={label}
            helpertext={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            fullWidth
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
            helpertext={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            inputProps={{ type: "number" }}
            fullWidth
            {...props}
        />
    );
}

// TODO: add textfield props
export function MaterialDatePicker({ name, label, setFieldValue, ...props }) {
    const [field] = useField(name);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
            <DatePicker
                // css={{ width: "100%" }}
                label={label}
                value={field.value}
                onChange={(value) => {
                    setFieldValue(name, value, true);
                }}
                slotProps={{ textField: { fullWidth: true } }}
                {...props}
            />
        </LocalizationProvider>
    );
}

export function MaterialStaticDateTimePicker({ name, setFieldValue, ...props }) {
    const [field] = useField(name);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
            <StaticDateTimePicker
                value={field.value}
                onChange={(value) => {
                    setFieldValue(name, value, true);
                }}
                orientation="landscape"
                slotProps={{ textField: { fullWidth: true } }}
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
            helpertext={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
            value={field.value ?? ""}
            onChange={field.onChange ?? props.handleChange}
            onBlur={field.onBlur}
            fullWidth
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

export function MaterialExperimentInput({ name, label, ...props }) {
    const [field, meta] = useField(name);

    if (props.enumvalue) {
        return (
            <>
                <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
                <Select
                    id={field.id}
                    name={field.name}
                    label={label}
                    helpertext={meta.touched ? meta.error : ""}
                    error={meta.touched && Boolean(meta.error)}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    fullWidth
                    {...props}>
                    {Object.keys(props.enumvalue).map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </>
        );
    }
    return (
        // <FormControl sx={{ m: 1, width: 300 }}>
        //     <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <TextField
            id={field.id}
            name={field.name}
            label={label}
            helpertext={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            fullWidth
            select
            {...props}>
            {props.children}
        </TextField>
        // </FormControl>
    );
}
