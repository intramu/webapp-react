import React from "react";
import { NavLink } from "react-router-dom";
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
                <LogoutButton />
            </div>
        </nav>
    );
}
