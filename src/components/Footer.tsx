/** @jsxImportSource @emotion/react */
import React from "react";
import { colors, definedSizes } from "../styles/scss/player/common";

export default function Footer() {
    return (
        <footer
            css={{
                zIndex: 2,
                backgroundColor: colors.footer,
                textAlign: "center",
                flex: "none",
                height: definedSizes.footerHeight,
                color: "white",
            }}>
            <div>
                <span>
                    <img
                        css={{ height: definedSizes.iconHeight, width: definedSizes.iconWidth }}
                        src="/logo192.png"
                        alt="logo"
                    />
                    @2023 INTRAMU LLC, All Rights Reserved
                </span>
            </div>
        </footer>
    );
}
