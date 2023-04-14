/** @jsxImportSource @emotion/react */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavItem } from "reactstrap";
import LogoutButton from "../LogoutButton";
import { colors, flexCenterVertical, flexRow } from "../../styles/player/common";

export function NavbarAdmin() {
    // #212529
    // rgb(33, 37, 41)

    return (
        <nav
            css={[
                {
                    backgroundColor: "#212529",
                    padding: 10,
                    flex: "none",
                    height: 50,
                    position: "relative",
                    "& a": { color: colors.primary, margin: "0 10px" },
                },
            ]}>
            <div css={flexCenterVertical}>
                <ul
                    css={[
                        flexRow,
                        { listStyleType: "none", alignItems: "center", margin: 0, padding: 0 },
                    ]}>
                    <li>
                        <NavLink to="/admin/portal">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/score-reporter">Score Reporter</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/competition-creator">Competition Creator</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/teams">Teams</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/players">Players</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/settings">Settings</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
    return (
        <Navbar color="dark" expand dark>
            <NavbarBrand>Admin</NavbarBrand>
            <Collapse navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to="/admin" className="nav-link">
                            Home
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/admin/score-reporter" className="nav-link">
                            Score Reporter
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/admin/competition-creator" className="nav-link">
                            Competition Creator
                        </Link>
                    </NavItem>
                    <NavItem>
                        <LogoutButton />
                    </NavItem>
                </Nav>
                <NavbarText>Simple Text</NavbarText>
            </Collapse>
        </Navbar>
    );
}
