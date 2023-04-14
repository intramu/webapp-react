/** @jsxImportSource @emotion/react */
import React from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import useSWR from "../../common/hooks/useSWR";
import { Roster } from "../../components/team/Roster";
import { Schedule } from "../../components/team/Schedule";
import { IJoinRequest } from "../../interfaces/IJoinRequest";
import {
    containerHolder,
    full,
    half,
    quarter,
    quarterHolder,
} from "../../styles/player/containers";
import { userRootStore } from "../_routes";
import { standardFontSizes } from "../../styles/player/common";

export const OneTeam = observer(() => {
    const { teamId } = useParams();
    const { teamStore } = userRootStore;

    const currentTeam = teamStore.find((x) => x.id === Number(teamId));

    const { data: requests } = useSWR<IJoinRequest[]>(`/teams/${teamId}/requests`);

    // useEffect(() => {
    //     const fetch = async () => {
    //         const token = await getAccessTokenSilently();
    //         team.fetchTeam(Number(teamId));
    //     };
    //     fetch();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    if (!currentTeam) {
        return <div>Error</div>;
    }

    const declineRequest = async (userId: string) => {
        currentTeam.declineRequest(userId);
    };

    const acceptRequest = async (userId: string) => {
        currentTeam.acceptRequest(userId);
    };

    return (
        <>
            <span>
                <span css={{ fontSize: standardFontSizes.xl }}>{currentTeam.name}</span>
            </span>
            <div css={[containerHolder]}>
                <div css={[half]}>
                    <Roster team={currentTeam} />
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
