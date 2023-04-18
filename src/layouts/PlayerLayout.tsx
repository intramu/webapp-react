/** @jsxImportSource @emotion/react */
import React from "react";
import { Outlet } from "react-router-dom";
import { FooterDashboard } from "../components/footer/FooterDashboard";
import { NavbarDashboard } from "../components/navbar/NavbarDashboard";
import { Sidebar } from "../components/sidebar/Sidebar";
import { colors, definedSizes, flexColumn, flexRow } from "../styles/player/common";
import { GeneralAlert } from "../components/GeneralAlert";

export function PlayerLayout() {
    return (
        <div css={[flexColumn, { height: "100%" }]}>
            <div css={[flexRow, { overflow: "hidden", flex: 1 }]}>
                <Sidebar />

                <div css={[flexColumn, { flexBasis: 1400, height: "100vh", position: "relative" }]}>
                    <NavbarDashboard />
                    <div
                        css={{
                            flex: "auto",
                            borderRadius: "24px 24px 0 0",
                            backgroundColor: colors.content,
                            padding: definedSizes.contentPadding,
                            overflow: "scroll",
                            overflowWrap: "anywhere",
                        }}>
                        <Outlet />
                    </div>
                    <GeneralAlert />
                </div>

                <div id="spacer" css={{ flexBasis: "auto", flexShrink: 2 }} />
            </div>
            <FooterDashboard />
        </div>
    );
}
