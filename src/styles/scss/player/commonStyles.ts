import { css } from "@emotion/react";

export const sizes = {
    containerWidth: "92%",
    containerRadius: "1em",
};

export const container = css({
    backgroundColor: "white",
    width: sizes.containerWidth,
    position: "relative",
    borderRadius: sizes.containerRadius,
    margin: "1em",
    padding: "1.5em",
});

export const leagueContainer = css({
    backgroundColor: "white",
    width: sizes.containerWidth,
    position: "relative",
    borderRadius: sizes.containerRadius,
    margin: "1em",
    padding: "1em",
});
