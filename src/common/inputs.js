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
