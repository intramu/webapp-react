import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
    const { user } = useAuth0();
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Navbar
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link active">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/team" className="nav-link">
                                    Team
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/team" className="nav-link">
                                    League
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/network" className="nav-link">
                                    Network
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/administration" className="nav-link">
                                    Admin
                                </Link>
                            </li>
                            <li className="nav-item">
                                <LogoutButton />
                            </li>
                            <li className="nav-item">
                                <span className="nav-link disabled">
                                    {user ? `Welcome ${user.name}` : "Login"}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
