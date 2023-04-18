/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Roster } from "../../components/team/Roster";
import { Schedule } from "../../components/team/Schedule";
import {
    containerHolder,
    full,
    half,
    quarter,
    quarterHolder,
} from "../../styles/player/containers";
import { userRootStore } from "../_routes";
import { standardFontSizes } from "../../styles/player/common";
import { TeamModel } from "../../models/team/TeamModel";

export const OneTeam = observer(() => {
    const { teamId } = useParams();
    const [team] = useState(() => new TeamModel());

    useEffect(() => {
        team.fetchTeam(Number(teamId));
    }, [team, team.fetchTeam, teamId]);

    // useEffect(() => {
    //     const fetch = async () => {
    //         const token = await getAccessTokenSilently();
    //         team.fetchTeam(Number(teamId));
    //     };
    //     fetch();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const declineRequest = async (userId: string) => {
        team.declineRequest(userId);
    };

    const acceptRequest = async (userId: string) => {
        team.acceptRequest(userId);
    };

    return (
        <>
            <span>
                <span css={{ fontSize: standardFontSizes.xl }}>{team.name}</span>
            </span>
            <button onClick={() => team.removePlayer("")}>test</button>
            <div css={[containerHolder]}>
                <div css={[half]}>
                    <Roster team={team} />
                </div>
                <div css={[quarterHolder]}>
                    <div css={[quarter]}>
                        <h3>Details</h3>
                    </div>
                    <div css={[quarter]}>
                        <h3>Next Game</h3>
                    </div>
                </div>
                <div css={[full]}>
                    <Schedule team={team} />
                </div>
                <div css={[half]}>
                    <h1>Requests</h1>
                    {team.requests && team.requests.length > 0
                        ? team.requests?.map((request, index) => (
                              <span key={index}>
                                  {`${request.requestingPlayerFullName} wants to join your team`}
                                  <button onClick={() => acceptRequest(request.playerAuthId)}>
                                      Accept
                                  </button>
                                  <button>Decline</button>
                              </span>
                          ))
                        : "No requests"}
                </div>
            </div>
        </>
    );
});
