/** @jsxImportSource @emotion/react */
import React from "react";
import { Outlet } from "react-router-dom";
import { FooterDashboard } from "../components/footer/FooterDashboard";
import { NavbarDashboard } from "../components/navbar/NavbarDashboard";
import Sidebar from "../components/sidebar/Sidebar";
import { colors, definedSizes, flexColumn, flexRow } from "../styles/scss/player/common";

export default function PlayerLayout() {
    return (
        <div css={[flexRow, { overflow: "hidden" }]}>
            <Sidebar />

            <div css={[flexColumn, { flexBasis: 1400, height: "100vh" }]}>
                <NavbarDashboard />
                <div
                    css={{
                        flex: "auto",
                        borderRadius: "2em 2em 0 0",
                        backgroundColor: colors.content,
                        padding: definedSizes.contentPadding,
                        overflow: "scroll",
                    }}>
                    <Outlet />
                </div>
            </div>

            <div id="spacer" css={{ flexBasis: "auto", flexShrink: 2 }} />

            <FooterDashboard />
        </div>
    );
}
