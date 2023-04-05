/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import useSWR from "../../common/hooks/useSWR";
import { IContest } from "../../interfaces/competition/IContest";
import { ITeam } from "../../interfaces/ITeam";
import { smallButton } from "../../styles/scss/player/buttons";
import {
    definedSizes,
    flexCenterVertical,
    flexColumn,
    flexRow,
    iconSizing,
    imageSizing,
    standardBorderRadius,
    standardBorders,
    standardFontSizes,
    standardShadows,
} from "../../styles/scss/player/common";
import "../../styles/scss/player/sidebar.scss";
import { ContestLink } from "./ContestLink";

const linkList: CSSObject = {
    ...flexColumn,
    margin: ".5em 1.2em .5em 1.2em",
};

const link: CSSObject = {
    padding: ".5em",
    ...flexCenterVertical,
};

const spacedLink: CSSObject = {
    ...flexRow,
    justifyContent: "space-between",
};

const icon: CSSObject = {
    margin: "0 1.1em",
    ...iconSizing.md,
};

const sidebarBox: CSSObject = {
    width: definedSizes.linkWidth,
    borderRadius: standardBorderRadius.sm,
    boxShadow: standardShadows[0],
    border: standardBorders[1],
    margin: "1.2em 0",
    "& a": {
        textDecoration: "none",
    },
    "& hr": {
        margin: "8px 0",
    },
};

const overflowControl: CSSObject = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "85%",
    whiteSpace: "nowrap",
    display: "inline-block",
};

function Sidebar() {
    // maybe wrap this into a promise all
    const { data: teams, error: teamsError } = useSWR<ITeam[]>("players/teams");
    const { data: contests, error: contestsError } = useSWR<IContest[]>("/contests");

    return (
        <aside
            css={[
                flexColumn,
                {
                    flexBasis: 365,
                    minWidth: 250,
                    maxWidth: 400,
                    flexShrink: 1,
                },
            ]}>
            <div css={{ height: 250 }}>
                <img
                    css={[imageSizing.sm, { position: "relative", top: 60, left: 70 }]}
                    src="/intramulogo.png"
                    alt="Logo"
                />
            </div>

            <div css={{ textAlign: "center" }}>
                <img css={[iconSizing.lg]} src="/logo192.png" alt="logo" />
                <span>
                    <span>Welcome</span>
                    <br />
                    Stevan Perrino
                </span>
            </div>

            <ul
                css={[
                    flexCenterVertical,
                    { flexDirection: "column", listStyleType: "none", paddingLeft: 0 },
                ]}>
                <li css={[sidebarBox]}>
                    <NavLink
                        // style={({ isActive }) => {
                        //     return {
                        //         color: isActive ? "red" : "",
                        //     };
                        // }}
                        css={[link]}
                        to="/dashboard">
                        <img css={[icon]} src="/logo192.png" alt="logo" />
                        Dashboard
                    </NavLink>
                </li>

                <li css={[sidebarBox]}>
                    <span css={[link]}>
                        <img css={[icon]} src="/logo192.png" alt="logo" />
                        Teams
                    </span>

                    <div css={[flexColumn, linkList]}>
                        {teams && (
                            <>
                                {teams.map((team) => (
                                    <div key={team.name}>
                                        <NavLink css={[spacedLink]} to={`/teams/${team.id}`}>
                                            <span css={[overflowControl]}>{team.name}</span>
                                            <img
                                                css={[iconSizing.md, { float: "right" }]}
                                                src="/logo192.png"
                                                alt="team"
                                            />
                                        </NavLink>
                                        <hr />
                                    </div>
                                ))}
                                <div
                                    css={[
                                        flexRow,
                                        { justifyContent: "space-evenly", marginTop: "10px" },
                                    ]}>
                                    {/* If contests is defined then this link should always redirect correctly */}
                                    {contests && (
                                        <Link
                                            css={[
                                                smallButton,
                                                {
                                                    backgroundColor: "blue",
                                                    color: "white",
                                                    fontSize: standardFontSizes.md,
                                                },
                                            ]}
                                            to={`/network/${contests[0].id}`}>
                                            Join Team
                                        </Link>
                                    )}
                                    <NavLink
                                        css={[
                                            smallButton,
                                            {
                                                border: "1px solid black",
                                                color: "black",
                                                fontSize: standardFontSizes.md,
                                            },
                                        ]}
                                        to="/teams/new">
                                        Create Team
                                    </NavLink>
                                </div>
                            </>
                        )}
                        {teamsError && <span css={[link]}>Error</span>}
                    </div>
                </li>

                <li css={[sidebarBox]}>
                    <span css={[link]}>
                        <img css={[icon]} src="/logo192.png" alt="logo" />
                        Network
                    </span>

                    {contests && (
                        <div css={[flexColumn, linkList]}>
                            {contests?.map((contest) => (
                                <div key={contest.id}>
                                    <ContestLink
                                        contest={contest}
                                        overflowControl={overflowControl}
                                        spacedLink={spacedLink}
                                    />
                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}
                    {contestsError && <span>Error</span>}
                </li>

                <li css={[sidebarBox]}>
                    <NavLink css={[link]} to="/help">
                        <img css={[icon]} src="/logo192.png" alt="logo" />
                        Help
                    </NavLink>
                </li>

                <li css={[sidebarBox]}>
                    <NavLink css={[link]} to="/test">
                        <img css={[icon]} src="/logo192.png" alt="logo" />
                        Test
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
