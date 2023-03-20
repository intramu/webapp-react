/** @jsxImportSource @emotion/react */
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/NavbarDashboard";
import Sidebar from "../components/Sidebar";
import { colors, definedSizes, flexColumn, flexRow } from "../styles/scss/player/common";

export default function PlayerLayout() {
    return (
        <div css={[flexColumn, { height: "100vh" }]}>
            <Navbar />

            <div
                css={[
                    flexRow,
                    {
                        overflow: "hidden",
                        flex: "auto",
                        marginRight: definedSizes.rightSidePageSpace,
                    },
                ]}>
                <Sidebar />

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

            <Footer />
        </div>
    );
}
