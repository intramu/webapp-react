import { CSSObject } from "@emotion/react";
import { colors, definedSizes, standardShadows } from "./common";

const containerMargin = "0.6em 0";
const containerPadding = "1.5em";
const halfWidth = "49%";
const fullHeight = "35vh";
const quarterHeight = "47%";

const networkHeight = "7vh";
const networkMargin = "1em 0";

const commonContainer: CSSObject = {
    backgroundColor: colors.background,
    position: "relative",
    boxShadow: standardShadows[0],
    // padding: containerPadding,
    borderRadius: definedSizes.borderRadius,
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
    minWidth: 600,
    margin: containerMargin,
    padding: containerPadding,
    "@media(max-width: 1000px)": {
        width: "92%",
    },
};

export const half: CSSObject = {
    backgroundColor: colors.background,
    // width: `calc(50% - ${containerMargin} * 2)`,
    width: halfWidth,
    height: fullHeight,
    position: "relative",
    borderRadius: definedSizes.borderRadius,
    margin: containerMargin,
    boxShadow: standardShadows[0],
    padding: containerPadding,
    overflowY: "scroll",
};

export const quarter: CSSObject = {
    backgroundColor: colors.background,
    height: quarterHeight,
    position: "relative",
    borderRadius: definedSizes.borderRadius,
    boxShadow: standardShadows[0],
    padding: containerPadding,
    overflowY: "scroll",
};

export const full: CSSObject = {
    ...commonContainer,
    height: fullHeight,
    margin: containerMargin,
    padding: containerPadding,
    overflowY: "scroll",
};

export const fullDynamic: CSSObject = {
    ...commonContainer,
    margin: containerMargin,
    padding: containerPadding,
};

export const networkContainer: CSSObject = {
    width: "100%",
    minHeight: networkHeight,
    margin: networkMargin,
    padding: "1.3em",
    // overflowY: "scroll",
    ...commonContainer,
};

export const divisionContainer: CSSObject = {
    minHeight: networkHeight,
    margin: "1em 2em",
    padding: "1.3em",
    borderRadius: definedSizes.borderRadius,
    backgroundColor: colors.content,
};

export const fullDropdown: CSSObject = {};
