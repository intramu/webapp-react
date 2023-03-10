import React from "react";
import { IsLoadingHOC } from "../components/hoc/IsLoadingHOC";

function Test(props: any) {
    const { setLoading } = props;
    return (
        <div>
            <button onClick={() => setLoading(true)}>Cause Load</button>
        </div>
    );
}

export default IsLoadingHOC(Test, "We are loading");
