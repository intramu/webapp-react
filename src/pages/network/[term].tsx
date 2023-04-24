import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import LeaguesList from "../../components/network/leagues/LeagueList";
import { ContestModel } from "../../models/contests/ContestModel";
import { colors, standardFontSizes } from "../../styles/player/common";

/** Network view for each individual term */
export const Term = observer(() => {
    const { compId } = useParams();
    const [contest] = useState(() => new ContestModel());

    useEffect(() => {
        contest.fetchContest(Number(compId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [compId]);

    if (contest.error) return <div>Error</div>;
    if (contest.state === "pending")
        return (
            <div>
                <Helmet>
                    <title>Network</title>
                </Helmet>
                Loading
            </div>
        );

    return (
        <>
            <Helmet>
                <title>Network</title>
            </Helmet>
            <div>
                <span css={{ fontSize: standardFontSizes.xl, fontWeight: "500" }}>
                    {contest.season} {contest.year}
                </span>
                <span css={{ color: colors.footerText, margin: "0 10px" }}>
                    Term {contest.term}
                </span>
                <LeaguesList leagues={contest.leagues} />
            </div>
        </>
    );
});
