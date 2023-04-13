/** @jsxImportSource @emotion/react */
import React from "react";
import { Helmet } from "react-helmet";
import { Requests } from "../components/messages/Requests";
import { fullDynamic } from "../styles/player/containers";

export function Messages() {
    return (
        <div>
            <Helmet>
                <title>Messages</title>
            </Helmet>
            <div css={[fullDynamic]}>
                <h3>Requests</h3>
                <Requests />
            </div>

            {/* <p>
                Im thinking for here we display chats, when that becomes an actual feature, and
                requests to join teams. If there is anything else that is a type of notification we
                might display it here.
            </p>
            <p>
                This might have to be a separate page like halo messages is. It just depends on how
                much information we can fit within our content area.
            </p>
            <h3>Chats</h3>
            <p>Under construction</p>

            <p>
                Im not sure how to set up push notifications as of now and that can be for a later
                version. When the page first loads I can do an initial fetch for any requests. After
                that the user will have to refresh for any new messages.
            </p> */}
        </div>
    );
}
