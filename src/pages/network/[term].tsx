import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "../../common/hooks/useSWR";
import LeaguesList from "../../components/network/leagues/LeagueList";
import { IContest } from "../../interfaces/competition/IContest";

export function Term() {
    // change to api call to grab season info with id
    const { compId } = useParams();

    const { data: season, error, isLoading } = useSWR<IContest>(`contests/${compId}`);

    console.log(season);

    if (error) return <div>Error</div>;
    if (isLoading) return <div>Loading</div>;

    return (
        <div>
            <span>Fall 2023 Term 2</span>
            {/* {season?.leagues.map((contest) => (
                <LeaguesList key={contest.id} leagues={contest.leagues} />
            ))} */}
            <LeaguesList leagues={season?.leagues ?? []} />
        </div>
    );
}
