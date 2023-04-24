import { CSSObject } from "@emotion/react";
import { createStyleMap } from "./stylemap";

/** Common CSS styling for entire application
 * random configuration variables that can quickly be changed
 */
export const definedSizes = {
    navbarHeight: "11vh",
    rightSidePageSpace: "6vw",
    footerHeight: "50px",
    iconHeight: "1.5em",
    iconWidth: "1.5em",
    borderRadius: 15,
    contentPadding: 38,

    networkIndentation: "0 2em",
    linkWidth: "75%",
    // containerWidth: "92%",
};

export const standardShadows = {
    // 0: "0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    0: "0 2px 7px 0 #00000014",
    1: "0 2px 5px 0 #00000016",
};

export const standardBorders = {
    0: "1px solid rgba(255, 255, 211, .5)",
    1: "1px solid #e0e0e0",
};

export const standardBorderRadius = {
    sm: "8px",
    md: "10px",
    lg: "15px",
};

export const standardFontSizes = {
    xs: "8px",
    sm: "10px",
    md: "13px",
    lg: "20px",
    xl: "25px",
};

export const standardFontStyles = {};

export const iconSizing = createStyleMap({
    xs: {
        height: ".5em",
        width: ".5em",
    },
    sm: {
        height: "1em",
        width: "1em",
    },
    md: {
        height: "1.5em",
        width: "1.5em",
    },
    lg: {
        height: "2em",
        width: "2em",
    },
});

export const imageSizing = createStyleMap({
    xs: {
        height: 50,
        width: 50,
    },
    sm: {
        height: 110,
        width: 110,
    },
    md: {
        height: 200,
        width: 200,
    },
});

export const colors = {
    background: "white",
    // footer: "#3b3b3b",
    footer: "#3e3e3e",
    footerText: "#888888",
    // content: "#dfe1eb",
    content: "#f6f7f9",

    primary: "#2b71e2",
    primaryHover: "#2b71e299",

    base: "#000000",
    baseHover: "#00000010",

    iconPrimary: "#4e4e4e",

    navbarText: "#919191",
    // secondary:
    // accent:
    text1: "black",
    text2: "grey",
    text3: "#457CD5",
    // text2:
};

// reusable flex box styling elements
export const center: CSSObject = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};

export const centerHorizontal: CSSObject = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
};

export const centerVertical: CSSObject = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
};

export const flexCenterVertical: CSSObject = {
    display: "flex",
    alignItems: "center",
};
export const flexCenterHorizontal: CSSObject = {
    display: "flex",
    justifyContent: "center",
};

export const flexColumn: CSSObject = {
    display: "flex",
    flexDirection: "column",
};

export const flexRow: CSSObject = {
    display: "flex",
    flexDirection: "row",
};
