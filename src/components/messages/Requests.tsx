import React, { useEffect, useState } from "react";
import useAxios from "../../common/hooks/useAxios";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IPlayerInvite } from "../../interfaces/IPlayerInvite";

function Requests() {
    const { getRequest, postRequest } = useAxios();

    const [requests, setRequests] = useState<IPlayerInvite[]>([]);

    const getRequests = async () => {
        const response = await getRequest<IPlayerInvite[]>("/players/requests");
        if (isErrorResponse(response)) {
            setRequests([]);
            return;
        }

        setRequests(response);
    };

    const acceptInvite = async (teamId: number, index: number) => {
        const response = await postRequest(`/players/requests/teams/${teamId}:accept`);
        if (isErrorResponse(response)) {
            return;
        }

        const list = [...requests];
        list.splice(index, 1);
        setRequests(list);
    };

    // const declineInvite = () => {};

    useEffect(() => {
        getRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>
                {requests.map((request, index) => (
                    <span key={index}>
                        <b>{request.requestingPlayerFullName}</b> wants you to join their team,{" "}
                        <b>{request.requestingTeamName}</b>
                        <button onClick={() => acceptInvite(request.teamId, index)}>Accept</button>
                        <button>Reject (Doesnt work)</button>
                    </span>
                ))}
            </div>
            <button onClick={getRequests}>Refresh</button>
        </>
    );
}
export default Requests;
