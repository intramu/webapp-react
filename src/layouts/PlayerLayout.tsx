import React from "react";
import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/NavbarDashboard";
import Sidebar from "../components/Sidebar";
import "../styles/scss/main.scss";

const useStyles = createUseStyles({
    mainContainer: {
        minHeight: "100vh",
        position: "relative",
    },
});

export default function PlayerLayout() {
    const classes = useStyles();

    return (
        <main id="player">
            <Navbar />

            <div id="main-page">
                <Sidebar />

                <div id="content">
                    <Outlet />
                </div>
            </div>

            <Footer />
        </main>
    );
}
