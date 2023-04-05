/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { colors, flexRow, iconSizing } from "../../styles/scss/player/common";

const icon: CSSObject = {
    margin: "0 .5em",
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
                        paddingBottom: 15,
                    },
                ]}>
                {/* <h4 css={{ paddingLeft: 5, color: colors.text3 }}>{title}</h4> */}
                <h4 css={{ paddingLeft: 5, color: colors.text3 }}>{document.title}</h4>
                <div
                    css={[
                        flexRow,
                        {
                            justifyContent: "right",
                            alignItems: "center",
                        },
                    ]}>
                    <Clock />
                    <div>
                        <Link css={[icon]} to="/profile">
                            <img src="/settings_FILL0_wght400_GRAD0_opsz48.svg" alt="test" />
                        </Link>
                        <Link css={[icon]} to="/messages">
                            <img css={[iconSizing.lg]} src="/email-svgrepo-com.svg" alt="test" />
                        </Link>
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
            <span>{`${time.getDate()} ${months[time.getMonth()]} ${time.getFullYear()}, ${
                weekday[time.getDay()]
            }`}</span>
            <span css={{ margin: "0 1em" }}>{`${
                time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
            }:${time.getMinutes()} ${time.getHours() > 11 ? "PM" : "AM"}`}</span>
        </>
    );
}
