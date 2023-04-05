import { CSSObject } from "@emotion/react";
import { createStyleMap } from "./stylemap";

export const definedSizes = {
    navbarHeight: "11vh",
    rightSidePageSpace: "6vw",
    footerHeight: "4vh",
    iconHeight: "1.5em",
    iconWidth: "1.5em",
    borderRadius: "1em",
    contentPadding: "2em",

    networkIndentation: "0 2em",
    linkWidth: "75%",
    // containerWidth: "92%",
};

export const standardShadows = {
    0: "0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

export const standardBorders = {
    0: "1px solid rgba(255, 255, 211, .5)",
    1: "1px solid rgba(0,0, 0, 1)",
};

export const standardBorderRadius = {
    sm: "5px",
    md: "10px",
    lg: "15px",
};

export const standardFontSizes = {
    xs: "8px",
    sm: "10px",
    md: "13px",
};

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
        height: 100,
        width: 100,
    },
    md: {
        height: 200,
        width: 200,
    },
});

export const colors = {
    background: "white",
    footer: "#3b3b3b",
    content: "#dfe1eb",

    // primary
    // secondary:
    // accent:
    text1: "black",
    text2: "grey",
    text3: "blue",
    // text2:
};

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

export const flexColumn: CSSObject = {
    display: "flex",
    flexDirection: "column",
};

export const flexRow: CSSObject = {
    display: "flex",
    flexDirection: "row",
};
