import { CSSObject } from "@emotion/react";
import { standardBorderRadius } from "./common";

const commonButton: CSSObject = {
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
    padding: "5px",
    // "&:hover":{

    // }
};
