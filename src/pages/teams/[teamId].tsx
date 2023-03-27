import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../common/hooks/useAxios";
import useSWR from "../../common/hooks/useSWR";
import Roster from "../../components/team/Roster";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IJoinRequest } from "../../interfaces/IJoinRequest";
import { ITeam } from "../../interfaces/ITeam";

function OneTeam() {
    const { teamId } = useParams();

    const { deleteRequest, postRequest } = useAxios();

    const { data: team, error, isLoading } = useSWR<ITeam>(`/teams/${teamId}`);
    const { data: requests } = useSWR<IJoinRequest[]>(`/teams/${teamId}/requests`);

    console.log(requests);

    // const declineRequest = async () => {};

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
    console.log(requests);

    return (
        <>
            <div className="container">
                <h1>{team?.name}</h1>
            </div>

            <Roster teamId={Number(teamId)} roster={team?.players ?? []} />
            <div className="container">Schedule</div>
            <div className="container">
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
        </>
    );
}

export default OneTeam;
