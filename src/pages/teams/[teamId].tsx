import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Roster } from "../../components/team/Roster";
import { Schedule } from "../../components/team/Schedule";
import {
    containerHolder,
    full,
    half,
    quarter,
    quarterHolder,
} from "../../styles/player/containers";
import { flexCenterVertical, standardFontSizes } from "../../styles/player/common";
import { TeamModel } from "../../models/team/TeamModel";
import { TeamRequests } from "../../components/team/Requests";

export const OneTeam = observer(() => {
    const { teamId } = useParams();
    const [team] = useState(() => new TeamModel());

    useEffect(() => {
        team.fetchTeam(Number(teamId));
        team.contestGameStore.sortGamesByDate();
    }, [team, team.fetchTeam, teamId]);

    return (
        <>
            <Helmet>
                <title>Team</title>
            </Helmet>
            <span>
                <span css={{ fontSize: standardFontSizes.xl }}>{team.name}</span>
            </span>
            <div css={[containerHolder, { "& h3": { marginBottom: 15 } }]}>
                <div css={[half]}>
                    <Roster team={team} />
                </div>
                <div css={[quarterHolder]}>
                    <div css={[quarter]}>
                        <h3>Details</h3>
                        <span>
                            Record: {team.wins} - {team.ties} - {team.losses}
                        </span>
                    </div>
                    <div css={quarter}>
                        <h3 css={{ marginBottom: 20 }}>Next Game</h3>
                        <div css={[flexCenterVertical]}>
                            {team.contestGameStore.games.length > 0 && (
                                <span>
                                    VS {team.contestGameStore.games[0].awayTeam.name} @
                                    {team.contestGameStore.games[0].location.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div css={[full]}>
                    <Schedule team={team} />
                </div>
                <TeamRequests requestStore={team.requestStore} />
            </div>
        </>
    );
});
