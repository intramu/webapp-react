/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { IsLoadingHOC } from "../components/hoc/IsLoadingHOC";
import { full, fullDynamic } from "../styles/scss/player/containers";

function Dashboard(props: any) {
    // useEffect(() => {
    //     setLoading(true);

    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 4000);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
            <div css={[fullDynamic, { textAlign: "center" }]}>
                <h1>Welcome to Intramu!</h1>
            </div>
            <div css={[fullDynamic, { textAlign: "center" }]}>
                <h1>This route should be protected.</h1>
            </div>
        </>
    );
}

export default IsLoadingHOC(Dashboard, "Loading...");
