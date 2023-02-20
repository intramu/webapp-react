import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
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
    const { getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const getToken = async () => {
            setToken(await getAccessTokenSilently());
        };
        getToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <span>
                <h1 className={classes.h1}>Settings</h1>
                <img src="/informationIcon.png" alt="Other" />
            </span>

            <Profile />
            <Preferences />
            <h4>{token}</h4>
        </div>
    );
}

export default SettingsLayout;
