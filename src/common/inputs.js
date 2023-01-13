import { useField } from "formik";
import React from "react";

/* eslint-disable react/jsx-props-no-spreading */
export default function TextInput(props) {
    const [field, meta] = useField(props);
    const { id, name, label } = props;
    return (
        <div>
            <label htmlFor={id || name}>{label}</label>
            <br />
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    );
}
