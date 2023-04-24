/* eslint-disable react/require-default-props */
import React from "react";
import { dynamicButton } from "../styles/player/buttons";
import { standardFontSizes } from "../styles/player/common";

interface ButtonProps {
    onClick?(): void;
    type?: "submit" | "reset" | "button";
    children: React.ReactNode;
}

export function GreyButton({ onClick, type, children }: ButtonProps) {
    return (
        <button
            css={[
                dynamicButton,
                {
                    border: "1px solid black",
                    color: "black",
                    fontSize: standardFontSizes.md,
                    "&:hover": {
                        backgroundColor: "#00000005",
                    },
                },
            ]}
            onClick={onClick}
            type={type}>
            {children}
        </button>
    );
}
