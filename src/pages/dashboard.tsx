import React from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react-lite";
import { fullDynamic } from "../styles/player/containers";
import { userRootStore } from "./_routes";

/** Main dashboard page where every user will land on login
 * Will also show announcements from Organization and Intramu in future versions
 */
export const Dashboard = observer(() => {
    const { organization } = userRootStore;

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div css={[fullDynamic, { textAlign: "center" }]}>
                <h1>Welcome to Intramu!</h1>
            </div>
            <div css={[fullDynamic, { textAlign: "center" }]}>
                <h1>This is the {organization.name} organization</h1>
            </div>
        </>
    );
});
