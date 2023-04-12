/** @jsxImportSource @emotion/react */
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { colors, flexCenterVertical, standardFontSizes } from "../../styles/scss/player/common";

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
                    height: 45,
                    color: colors.text2,
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                },
            ]}>
            <HomeIcon css={{ marginRight: 8, color: "white" }} />
            <span css={{ color: colors.footerText, fontSize: standardFontSizes.md }}>
                @2023 INTRAMU LLC, All Rights Reserved
            </span>
        </footer>
    );
}
