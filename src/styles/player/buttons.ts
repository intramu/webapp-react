import { CSSObject } from "@emotion/react";
import { standardBorderRadius } from "./common";

const commonButton: CSSObject = {
    backgroundColor: "unset",
    border: "none",
    borderRadius: standardBorderRadius.lg,
    textAlign: "center",
    display: "inline-block",
};
export const smallButton: CSSObject = {
    ...commonButton,
    width: "6rem",
    padding: "3px 0",
    // "&:hover":{

    // }
};

export const dynamicButton: CSSObject = {
    ...commonButton,
    padding: "3px 13px",
    // "&:hover":{

    // }
};

export const unstyledButton: CSSObject = {
    ...commonButton,
};
