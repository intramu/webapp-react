/** @jsxImportSource @emotion/react */
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "../../common/hooks/useSWR";
import { Roster } from "../../components/team/Roster";
import { Schedule } from "../../components/team/Schedule";
import { IJoinRequest } from "../../interfaces/IJoinRequest";
import { TeamModel } from "../../models/team/TeamModel";
import {
    containerHolder,
    full,
    half,
    quarter,
    quarterHolder,
} from "../../styles/player/containers";

export const OneTeam = observer(() => {
    const { teamId } = useParams();
    const { getAccessTokenSilently } = useAuth0();

    const [team] = useState(() => new TeamModel());

    // const { data: team, error, isLoading } = useSWR<ITeam>(`/teams/${teamId}`);
    const { data: requests } = useSWR<IJoinRequest[]>(`/teams/${teamId}/requests`);

    useEffect(() => {
        const fetch = async () => {
            const token = await getAccessTokenSilently();
            team.fetchTeam(Number(teamId));
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const declineRequest = async (userId: string) => {
        team.declineRequest(userId);
    };

    const acceptRequest = async (userId: string) => {
        team.acceptRequest(userId);
    };

    console.log(team.players[0]);

    return (
        <>
            <span>
                <span>{team.name}</span>
                <span>Soccer</span>
            </span>

            <div css={[containerHolder]}>
                <div css={[half]}>
                    {/* <MobxRoster
                        teamId={Number(teamId)}
                        roster={store.players ?? []}
                        removePlayer={store.removePlayer}
                    /> */}
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
                    <Schedule />
                </div>
                <div css={[half]}>
                    <h1>Requests</h1>
                    {requests && requests.length > 0
                        ? requests?.map((request, index) => (
                              <span key={index}>
                                  {`${request.requesting_player_full_name} wants to join your team`}
                                  <button onClick={() => acceptRequest(request.player_auth_id)}>
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
