/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import React from "react";
import { Helmet } from "react-helmet";
import { Profile } from "../components/profile/Profile";
import Settings from "../components/profile/Settings";
import { containerHolder, halfVerticalInfinite } from "../styles/scss/player/containers";

const test: CSSObject = {
    "@media(max-width: 1600px)": {
        justifyContent: "center",
    },
};

const font: CSSObject = {
    "@media(max-width: 800px)": {
        fontSize: 50,
    },
};

function ProfileSettings() {
    return (
        <>
            <Helmet>
                <title>Settings</title>
            </Helmet>
            <div css={[containerHolder, test]}>
                {/* <div
                    css={[
                        {
                            fontSize: 30,
                        },
                        font,
                    ]}>
                    Hello
                </div> */}
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

export default ProfileSettings;
