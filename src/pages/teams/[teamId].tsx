import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IsLoadingHOC } from "../../common/hoc/IsLoadingHOC";
import useAxios from "../../common/hooks/useAxios";
import useSWR from "../../common/hooks/useSWR";
import Roster from "../../components/team/Roster";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IJoinRequest } from "../../interfaces/IJoinRequest";
import { ITeam } from "../../interfaces/ITeam";

interface IOneTeam {
    setLoading(setLoading: boolean): void;
    setError(setError: string): void;
}

function OneTeam({ setError, setLoading }: IOneTeam) {
    const { teamId } = useParams();

    const { deleteRequest, postRequest } = useAxios();

    const { data: team, error, isLoading } = useSWR<ITeam>(`/teams/${teamId}`);
    const {
        data: requests,
        isLoading: fetchIsLoading,
        error: fetchError,
    } = useSWR<IJoinRequest[]>(`/teams/${teamId}/requests`);

    console.log(requests);

    useEffect(() => {
        if (fetchError) {
            setError(fetchError.errorMessage);
        }
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchIsLoading]);
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

            <Roster roster={team?.players ?? []} />
            <div className="container">Schedule</div>
            <div className="container">
                <h1>Requests</h1>
                {requests?.map((request, index) => (
                    <span key={index}>
                        {`${request.requesting_player_full_name} wants to join your team`}
                        <button onClick={() => acceptRequest(request.player_auth_id)}>
                            Accept
                        </button>
                        <button>Decline</button>
                    </span>
                ))}
            </div>
        </>
    );
}

export default IsLoadingHOC(OneTeam, "Loading");
