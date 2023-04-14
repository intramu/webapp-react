/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React, { useState } from "react";
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
import { smallButton } from "../../styles/player/buttons";
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
} from "../../styles/player/common";
import { ContestLink } from "./ContestLink";
import { userRootStore } from "../../pages/_routes";

const unorderedList: CSSObject = {
    ...flexCenterVertical,
    flexDirection: "column",
    listStyleType: "none",
};

const listItem: CSSObject = {
    width: definedSizes.linkWidth,
    borderRadius: standardBorderRadius.sm,
    boxShadow: standardShadows[1],
    border: standardBorders[1],
    margin: "11px 0",

    "&:hover": {
        backgroundColor: "#2b71e203",
    },
};

const link: CSSObject = {
    fontSize: 15,
    color: colors.iconPrimary,
};

const linkActive: CSSObject = {
    fontWeight: "bold",
    color: "black",
    "& svg": {
        color: colors.primary,
    },
};

const subLinkActive: CSSObject = {
    "&.active": {
        fontWeight: "bold",
        color: colors.primary,
    },
};

const listItemHeader: CSSObject = {
    ...link,
    ...flexCenterVertical,
    padding: "12px 8px",
};

const linkHover: CSSObject = {
    "&:hover": {
        color: "black",
        fontWeight: "bold",
    },
};

const listItemLink: CSSObject = {
    ...listItemHeader,
    // ...linkHover,
};

const listItemIcon: CSSObject = {
    margin: "0 17px",
};

const subList: CSSObject = {
    ...flexColumn,
    margin: "5px 25px 0px 25px",
    "& hr": {
        margin: "6px 0px",
    },
};

const subListLink: CSSObject = {
    ...link,
    ...linkHover,
    ...flexCenterVertical,
    padding: "3px 0px",
    justifyContent: "space-between",
};

const buttonContainer: CSSObject = {
    ...flexRow,
    margin: "8px 25px 10px 25px",
    justifyContent: "space-evenly",
    padding: "10px 0px",
};

const overflowControl: CSSObject = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "85%",
    whiteSpace: "nowrap",
    display: "inline-block",
};

function Sidebar() {
    const { player, teamStore } = userRootStore;
    // maybe wrap this into a promise all
    const { data: teams, error: teamsError } = useSWR<ITeam[]>("players/teams");
    const { data: contests, error: contestsError } = useSWR<IContest[]>("/contests");

    const [active, setActive] = useState("");

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

            <div css={[flexRow, { marginBottom: 40, justifyContent: "center" }]}>
                <div css={[flexRow, { width: "75%", alignItems: "center" }]}>
                    <PersonIcon css={{ fontSize: 40, margin: "0px 5px" }} />
                    <span>
                        <span css={{ fontSize: 11 }}>Welcome</span>
                        <br />
                        <span>
                            {player.firstName} {player.lastName}
                        </span>
                    </span>
                </div>
            </div>

            <ul css={unorderedList}>
                <li css={listItem}>
                    <Link
                        onClick={() => setActive("dash")}
                        css={[listItemLink, active === "dash" && linkActive]}
                        to="/dashboard">
                        <MenuOutlinedIcon css={listItemIcon} />
                        Dashboard
                    </Link>
                </li>

                <li css={listItem}>
                    <span css={[listItemHeader, active === "team" && linkActive]}>
                        <PeopleIcon css={listItemIcon} />
                        Teams
                    </span>
                    {teams && (
                        <>
                            <div css={subList}>
                                {teams.map((team) => (
                                    <div key={team.name}>
                                        <NavLink
                                            onClick={() => setActive("team")}
                                            css={[subListLink, subLinkActive]}
                                            to={`/teams/${team.id}`}>
                                            <span css={[overflowControl]}>{team.name}</span>
                                            <img
                                                css={[iconSizing.md]}
                                                src="/logo192.png"
                                                alt="team"
                                            />
                                        </NavLink>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                            <div css={buttonContainer}>
                                {/* If contests is defined then this link should always redirect correctly */}
                                {contests && (
                                    <Link
                                        onClick={() => setActive("network")}
                                        css={[
                                            smallButton,
                                            {
                                                backgroundColor: colors.primary,
                                                color: "white",
                                                fontSize: standardFontSizes.md,
                                                "&:hover": {
                                                    backgroundColor: colors.primaryHover,
                                                },
                                            },
                                        ]}
                                        to={`/network/${contests[0].id}`}>
                                        Join Team
                                    </Link>
                                )}
                                <Link
                                    onClick={() => setActive("team")}
                                    css={[
                                        smallButton,
                                        {
                                            border: "1px solid black",
                                            color: colors.base,
                                            fontSize: standardFontSizes.md,
                                            "&:hover": {
                                                backgroundColor: colors.baseHover,
                                            },
                                        },
                                    ]}
                                    to="/teams/new">
                                    Create Team
                                </Link>
                            </div>
                        </>
                    )}

                    {teamsError && (
                        <span css={listItemHeader}>
                            <CloudOffIcon css={listItemIcon} />
                            Error
                        </span>
                    )}
                </li>

                <li css={listItem}>
                    <span css={[listItemHeader, active === "network" && linkActive]}>
                        <PublicIcon css={listItemIcon} />
                        Network
                    </span>

                    {contests && (
                        <div css={subList}>
                            {contests?.map((contest) => (
                                <div key={contest.id}>
                                    <ContestLink
                                        contest={contest}
                                        overflowControl={overflowControl}
                                        styling={[subListLink, subLinkActive]}
                                        setActive={setActive}
                                    />
                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}
                    {contestsError && (
                        <span css={listItemHeader}>
                            <CloudOffIcon css={listItemIcon} />
                            Error
                        </span>
                    )}
                </li>

                <li css={listItem}>
                    <Link
                        onClick={() => setActive("help")}
                        css={[listItemLink, active === "help" && linkActive]}
                        to="/help">
                        <HelpOutlineIcon css={listItemIcon} />
                        Help
                    </Link>
                </li>

                <li css={listItem}>
                    <Link css={listItemLink} to="/admin/portal">
                        <AdminPanelSettingsIcon css={listItemIcon} />
                        Admin
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
