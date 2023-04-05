/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { IsLoadingHOC } from "../components/hoc/IsLoadingHOC";
import { full, fullDynamic } from "../styles/scss/player/containers";

export function Dashboard(props: any) {
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
                <h1>This route should be protected.</h1>
            </div>
        </>
    );
}
