import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";

function NavbarLanding() {
    const { loginWithRedirect } = useAuth0();
    return (
        <header>
            <div className="navs">
                <img src="/logo192.png" alt="logo" />
                <span>
                    <Link to="/">Mobile App</Link>
                </span>
                <span>
                    <Link to="/">Schools</Link>
                </span>
                <span>
                    <Link to="/">Testimonials</Link>
                </span>
            </div>

            <div id="landing-logo">
                <img src="/logo192.png" alt="logo" />
            </div>
            <div className="navs">
                <span>
                    <Link to="/">About Us</Link>
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
                                login_hint: "signup",
                            })
                        }>
                        Sign Up
                    </button>
                    OR
                    <span id="login">
                        <button className="button" onClick={() => loginWithRedirect()}>
                            Log In
                        </button>
                        <img src="/logo192.png" alt="icon" />
                    </span>
                </span>
            </div>
        </header>
    );
}

export default NavbarLanding;
