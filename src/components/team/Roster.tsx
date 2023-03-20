import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExSport, Role } from "../../common/enums";
import useAxios from "../../common/hooks/useAxios";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IRosterPlayer } from "../../interfaces/IPlayer";
import InviteMembers from "./InviteMembers";

interface IRoster {
    roster: IRosterPlayer[];
    teamId: number;
}

function Roster({ roster, teamId }: IRoster) {
    const navigate = useNavigate();
    const { putRequest, deleteRequest } = useAxios();
    const { user } = useAuth0();

    const [players, setPlayers] = useState<IRosterPlayer[]>(roster);
    console.log("roster", roster);
    console.log("players", players);

    useEffect(() => {
        setPlayers(roster);
    }, [roster]);

    /** Updates player role and updates the state */
    const updatePlayerRole = async (authId: string, role: Role) => {
        // request to api to update player role
        const response = await putRequest<null, { role: string }>(
            `/teams/${teamId}/players/${authId}`,
            {
                role,
            }
        );
        if (isErrorResponse(response)) {
            return;
        }

        // find player in list and update role
        const index = roster.findIndex((x) => x.authId === authId);
        const player = { ...players[index], role };
        const newList = [...players];
        newList[index] = player;
        setPlayers(newList);
    };

    /** Removes player from team and updates state */
    const kickPlayer = async (authId: string) => {
        // calls api to delete player
        const response = await deleteRequest(`/teams/${teamId}/players/${authId}`);
        if (isErrorResponse(response)) {
            return;
        }

        // remove player from roster by slicing
        const index = roster.findIndex((x) => x.authId === authId);
        const newList = [...players];
        newList.splice(index, 1);
        setPlayers(newList);
    };

    return (
        <div className="container" id="roster">
            <h1>Roster</h1>
            {players.map((player, index) => {
                return (
                    <span key={index}>
                        {`${player.firstName}, ${player.lastName} - ${player.gender} || ${player.role}, ${player.status}`}{" "}
                        {user?.sub !== player.authId && (
                            <span>
                                <button onClick={() => navigate(`/players/${player.authId}`)}>
                                    View
                                </button>

                                {player.role === Role.PLAYER && (
                                    <button
                                        onClick={() =>
                                            updatePlayerRole(player.authId, Role.COCAPTAIN)
                                        }>
                                        Promote
                                    </button>
                                )}
                                {player.role === Role.COCAPTAIN && (
                                    <button
                                        onClick={() =>
                                            updatePlayerRole(player.authId, Role.PLAYER)
                                        }>
                                        Demote
                                    </button>
                                )}
                                {![Role.COCAPTAIN, Role.CAPTAIN].includes(player.role) && (
                                    <button onClick={() => kickPlayer(player.authId)}>Kick</button>
                                )}
                            </span>
                        )}
                        <br />
                    </span>
                );
            })}
            <InviteMembers teamId={teamId} />
        </div>
    );
}

export default Roster;
