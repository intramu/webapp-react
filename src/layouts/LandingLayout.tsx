import React from "react";
import { Outlet } from "react-router-dom";
import FooterLanding from "../components/footer/FooterLanding";
import NavbarLanding from "../components/navbar/NavbarLanding";
import "../styles/scss/landing/main.scss";

export function LandingLayout() {
    return (
        <main id="landing">
            <div className="container-max">
                <NavbarLanding />

                <Outlet />
            </div>

            <FooterLanding />
        </main>
    );
}
