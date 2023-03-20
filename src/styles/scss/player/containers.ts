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
    backgroundColor: colors.containerBackground,
    position: "relative",
    boxShadow: standardShadows[0],
    // padding: containerPadding,
    borderRadius: definedSizes.borderRadius,
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
    backgroundColor: colors.containerBackground,
    width: "92%",
    minHeight: "35vh",
    position: "relative",
    borderRadius: definedSizes.borderRadius,
    margin: containerMargin,
    padding: containerPadding,
};

export const halfVerticalInfinite: CSSObject = {
    backgroundColor: colors.containerBackground,
    width: halfWidth,
    minHeight: fullHeight,
    position: "relative",
    borderRadius: definedSizes.borderRadius,
    margin: containerMargin,
    padding: containerPadding,
};

export const half: CSSObject = {
    backgroundColor: colors.containerBackground,
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
    backgroundColor: colors.containerBackground,
    height: quarterHeight,
    position: "relative",
    borderRadius: definedSizes.borderRadius,
    boxShadow: standardShadows[0],
    padding: containerPadding,
    overflowY: "scroll",
};

export const full: CSSObject = {
    backgroundColor: colors.containerBackground,
    // width: `calc(50% - ${containerMargin} * 2)`,
    width: "100%",
    height: fullHeight,
    position: "relative",
    borderRadius: definedSizes.borderRadius,
    margin: containerMargin,
    boxShadow: standardShadows[0],
    padding: containerPadding,
    overflowY: "scroll",
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
