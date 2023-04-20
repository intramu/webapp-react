/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { fullDynamic } from "../styles/player/containers";
import { userRootStore } from "./_routes";

export const Dashboard = observer(() => {
    const { organization } = userRootStore;
    console.log(toJS(organization));

    // useEffect(() => {
    //     setLoading(true);

    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 4000);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

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
