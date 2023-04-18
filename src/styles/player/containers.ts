import { CSSObject } from "@emotion/react";
import { colors, definedSizes, standardBorders, standardShadows } from "./common";

const containerMargin = "9px 0";
const containerPadding = "1.5em";
const halfWidth = "49%";
const fullHeight = "35vh";
const quarterHeight = "47%";
// const containerRadius =

export const commonContainer: CSSObject = {
    backgroundColor: colors.background,
    position: "relative",
    boxShadow: standardShadows[0],
    borderRadius: definedSizes.borderRadius,
};

// maybe replace the common with this
export const newCommonContainer: CSSObject = {
    backgroundColor: colors.background,
    position: "relative",
    boxShadow: standardShadows[0],
    borderRadius: definedSizes.borderRadius,
    padding: containerPadding,
};

export const header: CSSObject = {
    padding: "10px 0px 50px 25px",
};

export const containerHolder: CSSObject = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 20,

    "@media(max-width: 1600px)": {
        alignItems: "center",
        flexDirection: "column",
    },
};

export const quarterHolder: CSSObject = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: halfWidth,
    height: fullHeight,
    margin: containerMargin,
};

export const fullVerticalInfinite: CSSObject = {
    ...commonContainer,
    minHeight: "35vh",
    margin: containerMargin,
    padding: containerPadding,
};

export const halfVerticalInfinite: CSSObject = {
    ...commonContainer,
    width: halfWidth,
    minHeight: fullHeight,
    margin: containerMargin,
    padding: containerPadding,
    // "@media(max-width: 1600px)": {
    //     width: "92%",
    // },
};

export const half: CSSObject = {
    ...commonContainer,
    width: halfWidth,
    height: fullHeight,
    margin: containerMargin,
    padding: containerPadding,
    overflowY: "auto",
};

export const quarter: CSSObject = {
    ...commonContainer,
    height: quarterHeight,
    padding: containerPadding,
    overflowY: "auto",
};

export const full: CSSObject = {
    ...commonContainer,
    height: fullHeight,
    margin: containerMargin,
    padding: containerPadding,
    overflowY: "auto",
    width: "100%",
};

export const fullDynamic: CSSObject = {
    ...commonContainer,
    margin: containerMargin,
    padding: containerPadding,
};

export const networkContainer: CSSObject = {
    ...commonContainer,
    width: "100%",
    margin: "16px 0",
    padding: "15px 30px",
};

export const fullDropdown: CSSObject = {};

export const divisionContainer: CSSObject = {
    margin: "18px 15px",
    padding: "12px 30px",
    borderRadius: definedSizes.borderRadius,
    border: standardBorders[1],
    backgroundColor: colors.content,
};

export const bracketContainer: CSSObject = {
    margin: "18px 15px",
    padding: "12px 30px",
    borderRadius: definedSizes.borderRadius,
    // needs a transparent border to prevent slight move when switching to divisionContainer
    border: "1px solid transparent",
    boxShadow: standardShadows[1],
    backgroundColor: colors.background,
};
