/** @jsxImportSource @emotion/react */
import React from "react";
import { Outlet } from "react-router-dom";
import { NavbarAdmin } from "../components/navbar/NavbarAdmin";
import { FooterDashboard } from "../components/footer/FooterDashboard";

export function AdminLayout() {
    return (
        <div css={{ minHeight: "100vh", position: "relative" }}>
            <NavbarAdmin />
            <div css={{ padding: 15 }}>
                <Outlet />
            </div>
            <FooterDashboard />
        </div>
    );
}
