import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div>
            Main Dashboard Where the user will see all kinds of data about the next games and team
            stats.
            <h1>
                This route should be protected. If your seeing this and not logged in pls report bug
            </h1>
            <br />
            <h2>
                Check out team page by clicking <Link to="/team/team-view">here</Link> or in the
                navbar
            </h2>
        </div>
    );
}
