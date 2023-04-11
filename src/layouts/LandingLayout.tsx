import React from "react";
import { Outlet } from "react-router-dom";
import FooterLanding from "../components/footer/FooterLanding";
import NavbarLanding from "../components/navbar/NavbarLanding";
import "../styles/scss/landing/home.scss";

export function LandingLayout() {
    return (
        <main id="landing">
            <NavbarLanding />

            <Outlet />

            <FooterLanding />
        </main>
    );
}
