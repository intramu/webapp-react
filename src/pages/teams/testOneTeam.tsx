/** @jsxImportSource @emotion/react */
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../common/hooks/useAxios";
import useSWR from "../../common/hooks/useSWR";
import { Roster } from "../../components/team/Roster";
import { Schedule } from "../../components/team/Schedule";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IJoinRequest } from "../../interfaces/IJoinRequest";
import { ITeam } from "../../interfaces/ITeam";
import { TeamModel } from "../../models/team/TeamModel";
import {
    containerHolder,
    full,
    half,
    quarter,
    quarterHolder,
} from "../../styles/scss/player/containers";

interface testProps {
    store: TeamModel;
}
export const TestOneTeam = observer<testProps>(({ store }) => {
    const { teamId } = useParams();
    const { getAccessTokenSilently } = useAuth0();

    const { postRequest } = useAxios();

    const { data: team, error, isLoading } = useSWR<ITeam>(`/teams/${teamId}`);
    const { data: requests } = useSWR<IJoinRequest[]>(`/teams/${teamId}/requests`);

    useEffect(() => {
        const test = async () => {
            const token = await getAccessTokenSilently();
            store.fetchTeam(Number(teamId), token);
        };
        test();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const acceptRequest = async (userId: string) => {
        console.log("here");

        const response = await postRequest(`/teams/${teamId}/requests/${userId}:accept`);

        if (isErrorResponse(response)) {
            return;
        }

        requests?.filter((x) => x.player_auth_id !== userId);
        // const index = requests?.map((x) => x.authId).indexOf(userId);
        // requests?.splice(index, 1);
    };

    return (
        <>
            <span>
                <span>{store.name}</span>
                <span>Soccer</span>
            </span>

            <div css={[containerHolder]}>
                <div css={[half]}>
                    {/* <MobxRoster
                        teamId={Number(teamId)}
                        roster={store.players ?? []}
                        removePlayer={store.removePlayer}
                    /> */}
                    {/* <Roster teamId={Number(teamId)} roster={team?.players ?? []} /> */}
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
            {/* <MobxRoster
                    teamId={Number(teamId)}
                    roster={store.players ?? []}
                    removePlayer={store.removePlayer}
                /> */}
        </>
    );
});
