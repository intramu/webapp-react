import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "../../common/hooks/useSWR";
import LeaguesList from "../../components/network/leagues/LeagueList";
import { IContest } from "../../interfaces/competition/IContest";
import { ContestModel } from "../../models/contests/ContestModel";

export const Term = observer(() => {
    // change to api call to grab season info with id
    const { compId } = useParams();
    const [contest] = useState(() => new ContestModel());

    useEffect(() => {
        contest.fetchContest(Number(compId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (contest.error) return <div>Error</div>;
    if (contest.state === "pending") return <div>Loading</div>;

    return (
        <div>
            <span>Fall 2023 Term 2</span>
            {/* {season?.leagues.map((contest) => (
                <LeaguesList key={contest.id} leagues={contest.leagues} />
            ))} */}
            <LeaguesList leagues={contest.leagues} />
        </div>
    );
});
