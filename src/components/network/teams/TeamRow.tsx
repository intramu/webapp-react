import React from "react";
import { useNavigate } from "react-router-dom";
import { Visibility } from "../../../common/enums";
import useAxios from "../../../common/hooks/useAxios";
import { isErrorResponse } from "../../../interfaces/ErrorResponse";
import { ITeam } from "../../../interfaces/ITeam";

interface ITeamRow {
    team: ITeam;
    maxTeamSize: number;
}
function TeamRow({ team, maxTeamSize }: ITeamRow) {
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

            {team.visibility === Visibility.OPEN && (
                <button onClick={() => joinTeam(team.id)}>Join</button>
            )}

            {team.visibility === Visibility.PRIVATE && (
                <button onClick={() => requestToJoinTeam(team.id)}>Request</button>
            )}

            <span>
                {team.players.length}/{maxTeamSize}
            </span>
        </div>
    );
}

export default TeamRow;
