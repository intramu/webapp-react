import React from "react";
import { observer } from "mobx-react-lite";

interface MobbinInput {
    name: string;
    value: string;
}

interface TextInputProps {
    mobbinInput: MobbinInput;
}

export const Input = observer((props: TextInputProps) => {
    const { mobbinInput } = props;

    const onChange = (e: any) => {
        const { value: test } = e.target;

        mobbinInput.value = test;
    };

    return <input name={mobbinInput.name} onChange={onChange} />;
});
