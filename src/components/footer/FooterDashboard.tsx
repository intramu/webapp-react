/** @jsxImportSource @emotion/react */
import React from "react";
import {
    colors,
    definedSizes,
    flexCenterVertical,
    iconSizing,
} from "../../styles/scss/player/common";

export function FooterDashboard() {
    return (
        <footer
            css={[
                flexCenterVertical,
                {
                    zIndex: 2,
                    backgroundColor: colors.footer,
                    textAlign: "center",
                    flex: "none",
                    height: definedSizes.footerHeight,
                    color: colors.text2,
                    justifyContent: "center",
                },
            ]}>
            <span>
                <img css={[iconSizing.md, { margin: "0 1em" }]} src="/logo192.png" alt="logo" />
                @2023 INTRAMU LLC, All Rights Reserved
            </span>
        </footer>
    );
}
