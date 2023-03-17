import React from "react";
import { ILeague } from "../../../interfaces/competition/ILeague";
import LeagueBox from "./LeagueBox";

function LeaguesList({ leagues }: { leagues: ILeague[] }) {
    return (
        <>
            {leagues.map((league, index) => (
                <LeagueBox key={index} league={league} />
            ))}
        </>
    );
}

export default LeaguesList;
