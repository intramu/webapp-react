/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import useSWR from "../../common/hooks/useSWR";

import { IContest } from "../../interfaces/competition/IContest";
import { ITeam } from "../../interfaces/ITeam";
import { smallButton } from "../../styles/scss/player/buttons";
import {
    colors,
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
    padding: "12px 8px",
    boxSizing: "border-box",
    fontSize: 15,
    color: colors.iconPrimary,
    ...flexCenterVertical,
    "&:hover": {
        color: "black",
    },
    "&.active": {
        "& svg": {
            color: colors.primary,
        },
    },
};

const spacedLink: CSSObject = {
    ...flexRow,
    justifyContent: "space-between",
};

const icon: CSSObject = {
    margin: "0 1.1em",
    // ...iconSizing.md,
};

const sidebarBox: CSSObject = {
    width: definedSizes.linkWidth,
    borderRadius: standardBorderRadius.sm,
    boxShadow: standardShadows[1],
    border: standardBorders[1],
    margin: "11px 0",
    "& a": {
        textDecoration: "none",
    },
    "& hr": {
        margin: "8px 0",
    },
    "&:hover": {
        backgroundColor: "#2b71e203",
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
            <div css={{ height: 210 }}>
                <img
                    css={[
                        imageSizing.sm,
                        {
                            position: "relative",
                            top: 60,
                            left: 70,
                            transition: "all .2s ease",
                            "&:hover": {
                                transform: "scale(1.2)",
                            },
                        },
                    ]}
                    src="/intramulogo.png"
                    alt="Logo"
                />
            </div>

            <div
                css={[
                    flexRow,
                    { alignItems: "center", justifyContent: "center", marginBottom: 40 },
                ]}>
                <PersonIcon css={{ fontSize: 40 }} />
                <span>
                    <span css={{ fontSize: 11 }}>Welcome</span>
                    <br />
                    <span>Stevan Perrino</span>
                </span>
            </div>

            <ul
                css={[
                    flexCenterVertical,
                    { flexDirection: "column", listStyleType: "none", paddingLeft: 0 },
                ]}>
                <li css={[sidebarBox]}>
                    <NavLink css={link} to="/dashboard">
                        <MenuOutlinedIcon css={icon} />
                        Dashboard
                    </NavLink>
                </li>

                <li css={[sidebarBox]}>
                    <span css={[link]}>
                        <PeopleIcon css={icon} />
                        Teams
                    </span>
                    {teams && (
                        <div css={[flexColumn, linkList]}>
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
                                    { justifyContent: "space-evenly", padding: "10px 0px" },
                                ]}>
                                {/* If contests is defined then this link should always redirect correctly */}
                                {contests && (
                                    <Link
                                        css={[
                                            smallButton,
                                            {
                                                backgroundColor: colors.primary,
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
                        </div>
                    )}
                    {teamsError && (
                        <span css={link}>
                            <CloudOffIcon css={icon} />
                            Error
                        </span>
                    )}
                </li>

                <li css={[sidebarBox]}>
                    <span css={link}>
                        <PublicIcon css={icon} />
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
                    {contestsError && (
                        <span css={link}>
                            <CloudOffIcon css={icon} />
                            Error
                        </span>
                    )}
                </li>

                <li css={[sidebarBox]}>
                    <NavLink css={[link]} to="/help">
                        <HelpOutlineIcon css={icon} />
                        Help
                    </NavLink>
                </li>

                <li css={[sidebarBox]}>
                    <NavLink css={[link]} to="/administration">
                        <AdminPanelSettingsIcon css={icon} />
                        Admin
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
