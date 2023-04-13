/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React, { useEffect, useReducer, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { colors, flexRow } from "../../styles/player/common";

const link: CSSObject = {
    marginLeft: 14,
    "&.active": {
        "& svg": {
            color: colors.primary,
        },
    },
};

const icon: CSSObject = {
    "&:hover": {
        transform: "scale(1.2)",
        color: colors.primary,
    },
    color: "black",
};

export function NavbarDashboard() {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const location = useLocation();

    useEffect(() => {
        forceUpdate();
    }, [location]);

    return (
        <header
            css={{
                height: 120,
                position: "relative",
                flex: "none",
            }}>
            <div
                css={[
                    flexRow,
                    {
                        justifyContent: "space-between",
                        alignItems: "end",
                        height: "100%",
                        paddingBottom: 20,
                    },
                ]}>
                <h4 css={{ paddingLeft: 5, color: colors.text3 }}>{document.title}</h4>
                <div
                    css={[
                        flexRow,
                        {
                            alignItems: "center",
                            marginRight: 30,
                        },
                    ]}>
                    <Clock />
                    <div>
                        <NavLink css={link} to="/messages">
                            <MailOutlinedIcon css={icon} />
                        </NavLink>
                        <NavLink css={link} to="/profile">
                            <AccountCircleOutlinedIcon css={icon} />
                        </NavLink>
                        <NavLink css={link} to="/profile">
                            <SettingsOutlinedIcon css={icon} />
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}

function Clock() {
    const [time, setTime] = useState<Date>(new Date());
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <>
            <span css={{ color: colors.navbarText }}>{`${time.getDate()} ${
                months[time.getMonth()]
            } ${time.getFullYear()}, ${weekday[time.getDay()]}`}</span>
            <span css={{ margin: "0 1em", color: colors.navbarText }}>{`${
                time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
            }:${time.getMinutes()} ${time.getHours() > 11 ? "PM" : "AM"}`}</span>
        </>
    );
}
