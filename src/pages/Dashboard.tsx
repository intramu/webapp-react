/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";

import { IsLoadingHOC } from "../common/hoc/IsLoadingHOC";

function Dashboard() {
    return (
        <div css={{ backgroundColor: "red" }}>
            Main Dashboard Where the user will see all kinds of data about the next games and team
            stats.
            <h1>This route should be protected.</h1>
            <br />
        </div>
    );
}

export default Dashboard;
