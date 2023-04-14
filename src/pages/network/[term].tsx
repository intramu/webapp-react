/** @jsxImportSource @emotion/react */
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "../../common/hooks/useSWR";
import LeaguesList from "../../components/network/leagues/LeagueList";
import { IContest } from "../../interfaces/competition/IContest";
import { ContestModel } from "../../models/contests/ContestModel";
import { colors, standardFontSizes } from "../../styles/player/common";

export const Term = observer(() => {
    // change to api call to grab season info with id
    const { compId } = useParams();
    const [contest] = useState(() => new ContestModel());

    console.log(contest.season);

    useEffect(() => {
        contest.fetchContest(Number(compId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (contest.error) return <div>Error</div>;
    if (contest.state === "pending") return <div>Loading</div>;

    return (
        <div>
            <span css={{ fontSize: standardFontSizes.xl, fontWeight: "500" }}>
                {contest.season} {contest.year}
            </span>
            <span css={{ color: colors.footerText, margin: "0 10px" }}>Term {contest.term}</span>
            <LeaguesList leagues={contest.leagues} />
        </div>
    );
});
