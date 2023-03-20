import { CSSObject } from "@emotion/react";

export const definedSizes = {
    navbarHeight: "11vh",
    rightSidePageSpace: "7.5vw",
    footerHeight: "5vh",
    iconHeight: "1.5em",
    iconWidth: "1.5em",
    borderRadius: "1em",
    contentPadding: "2em",

    networkIndentation: "0 2em",
    // $link-width: 90%;
    // containerWidth: "92%",
};

export const standardShadows = {
    0: "0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

// this seems unsafe because theres no typing
// buuuuuut because its only height and width, I feel its ok
export const smallIconSize = {
    xs: "height: .5em; width: 5em",
    sm: "height: 1em; width: 1em",
    md: "height: 1.5em; width: 1.5em",
    lg: "height: 2em; width: 2em",
};

export const sidebarLink: CSSObject = {
    linkBorder: "1px solid rgba(255, 255, 211, .5)",
    width: "90%",
    borderRadius: definedSizes.borderRadius,
    boxShadow: standardShadows[0],
    margin: "1.2em",
    minHeight: "2.2em",
};

export const colors = {
    background: "white",
    content: "#dfe1eb",
    footer: "black",
    containerBackground: "white",
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
