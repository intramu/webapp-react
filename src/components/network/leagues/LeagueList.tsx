import React from "react";
import { ILeague } from "../../../interfaces/competition/ILeague";
import LeagueBox from "./LeagueBox";
import { LeagueModel } from "../../../models/contests/LeagueModel";

function LeaguesList({ leagues }: { leagues: LeagueModel[] }) {
    return (
        <div style={{ marginLeft: "20px" }}>
            {leagues.map((league, index) => (
                <LeagueBox key={index} league={league} />
            ))}
        </div>
    );
}

export default LeaguesList;
