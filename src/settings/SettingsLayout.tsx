import React from "react";
import { createUseStyles } from "react-jss";
import Preferences from "./Preferences";
import Profile from "./Profile";

const useStyles = createUseStyles({
    h1: {
        display: "inline",
    },
});

function SettingsLayout() {
    const classes = useStyles();

    return (
        <div>
            <span>
                <h1 className={classes.h1}>Settings</h1>
                <img src="/informationIcon.png" alt="Other" />
            </span>

            <Profile />
            <Preferences />
        </div>
    );
}

export default SettingsLayout;
