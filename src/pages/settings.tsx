import React from "react";
import { Helmet } from "react-helmet";
import { Profile } from "../components/profile/Profile";
import Settings from "../components/profile/Settings";
import { containerHolder, halfVerticalInfinite } from "../styles/player/containers";

/** Parent for settings and profile */
export function ProfileSettings() {
    return (
        <>
            <Helmet>
                <title>Settings</title>
            </Helmet>
            <div css={[containerHolder]}>
                <div css={[halfVerticalInfinite]}>
                    <Profile />
                </div>
                <div css={[halfVerticalInfinite]}>
                    <Settings />
                </div>
            </div>
        </>
    );
}
