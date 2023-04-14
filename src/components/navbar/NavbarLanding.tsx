import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";

function NavbarLanding() {
    const { loginWithRedirect } = useAuth0();
    return (
        <header>
            <div className="navs" id="left">
                <Link to="/">
                    <img src="/logo192.png" alt="logo" />
                </Link>

                <span>
                    {/* <Link to="#section-two">Mobile App</Link> */}
                    <a href="/#mobile-app">Mobile App</a>
                </span>
                <span>
                    <a href="/#schools-testimonials">Schools</a>
                </span>
                <span>
                    <a href="/#schools-testimonials">Testimonials</a>
                </span>
            </div>

            <div id="landing-logo">
                <img src="/intramulogo.png" alt="logo" />
            </div>
            <div className="navs" id="right">
                <span>
                    <Link to="/about">About Us</Link>
                </span>
                <span>
                    <Link to="/">Contact Us</Link>
                </span>
                <span>
                    {/* Redirects to sign up with hint */}
                    <button
                        id="signup"
                        className="button"
                        onClick={() =>
                            loginWithRedirect({
                                authorizationParams: {
                                    screen_hint: "signup",
                                },
                                appState: {
                                    returnTo: "/dashboard",
                                },
                            })
                        }>
                        Sign Up
                    </button>
                    OR
                    <button
                        id="login"
                        className="button"
                        onClick={() =>
                            loginWithRedirect({
                                appState: {
                                    returnTo: "/dashboard",
                                },
                            })
                        }>
                        Log In
                        <img src="/logo192.png" alt="icon" />
                    </button>
                </span>
            </div>
        </header>
    );
}

export default NavbarLanding;
