import React, { useEffect, useReducer, useState } from "react";
import { CSSObject } from "@emotion/react";
import dayjs from "dayjs";
import { NavLink, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Badge } from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { colors, flexRow } from "../../styles/player/common";
import { userRootStore } from "../../pages/_routes";

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

export const NavbarDashboard = observer(() => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const location = useLocation();

    const { inviteStore } = userRootStore;

    useEffect(() => {
        forceUpdate();
    }, [location.pathname]);

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
                            <Badge badgeContent={inviteStore.invites.length} color="primary">
                                <MailOutlinedIcon css={icon} />
                            </Badge>
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
});

function Clock() {
    const [time, setTime] = useState(dayjs());

    const clockLeft = "DD MMMM YYYY, dddd";
    const clockRight = "h:mm A";

    useEffect(() => {
        const timerId = setInterval(() => setTime(dayjs()), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <div css={{ color: colors.navbarText }}>
            <span>{time.format(clockLeft)}</span>
            <span css={{ margin: "0 16px" }}>{time.format(clockRight)}</span>
        </div>
    );
}
