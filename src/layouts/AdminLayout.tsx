import React from "react";
import { Outlet } from "react-router-dom";
import { NavbarAdmin } from "../components/navbar/NavbarAdmin";
import { FooterDashboard } from "../components/footer/FooterDashboard";
import { flexColumn } from "../styles/player/common";

export function AdminLayout() {
    return (
        <div css={[flexColumn, { height: "100vh", overflow: "hidden" }]}>
            <NavbarAdmin />
            <main css={{ padding: 25, marginBottom: 40, overflow: "auto", flex: "auto" }}>
                <Outlet />
            </main>
            <FooterDashboard />
        </div>
    );
}
