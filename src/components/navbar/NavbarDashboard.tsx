/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { definedSizes, flexRow, iconSizing } from "../../styles/scss/player/common";

const icon: CSSObject = {
    margin: "0 .5em",
};

export function NavbarDashboard() {
    return (
        <header
            css={{
                height: definedSizes.navbarHeight,
                marginRight: definedSizes.rightSidePageSpace,
                position: "relative",
                flex: "none",
            }}>
            <img
                css={{ left: "4vw", top: "40px", height: "inherit", position: "absolute" }}
                id="icon"
                src="/intramulogo.png"
                alt="Logo"
            />
            <div
                css={[
                    flexRow,
                    {
                        justifyContent: "right",
                        alignItems: "center",
                        height: "100%",
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
