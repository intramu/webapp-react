import React from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../common/hooks/useAxios";
import { isErrorResponse } from "../../../interfaces/ErrorResponse";
import { ITeam } from "../../../interfaces/ITeam";
import { TeamVisibility } from "../../../utilities/enums/teamEnum";

interface ITeamRow {
    team: ITeam;
}
function TeamRow({ team }: ITeamRow) {
    const { postRequest } = useAxios();
    const navigate = useNavigate();

    const joinTeam = async (id: number) => {
        console.log("joining open team");
        const response = await postRequest<null, null>(`/team/${id}/players`);
        if (isErrorResponse(response)) {
            // handle error message with little popup or something
            return;
        }

        // if success send to team page
        navigate(`/team/${id}`);
    };

    const requestToJoinTeam = (id: number) => {
        // send request to join team
        const response = postRequest<null, null>(`/team/${id}/requests`);
        if (isErrorResponse(response)) {
            // if error show little error popup or something
            return;
        }

        // if success show little checkmark or success message
        console.log("Request Sent");
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <span>{team.name}</span>
            <span>{team.visibility}</span>

            {team.visibility === TeamVisibility.PUBLIC && (
                <button onClick={() => joinTeam(team.id)}>Join</button>
            )}

            {team.visibility === TeamVisibility.PRIVATE && (
                <button onClick={() => requestToJoinTeam(team.id)}>Request</button>
            )}
        </div>
    );
}

export default TeamRow;
