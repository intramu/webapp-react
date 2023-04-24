import React, { useEffect, useState } from "react";
// import Popup from "reactjs-popup";
import useAxios from "../../common/hooks/useAxios";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IPlayer } from "../../interfaces/IPlayer";

interface IInviteMembers {
    teamId: number;
}

function InviteMembers({ teamId }: IInviteMembers) {
    const [isLocked, setIsLocked] = useState(false);
    const [option, setOption] = useState<string>("");
    const [players, setPlayers] = useState<IPlayer[]>();

    const { getRequest, postRequest } = useAxios();

    useEffect(() => {
        if (players && players.length > 0) {
            setOption(players[0].authId);
        }
    }, [players]);

    // idea here is to pause just slightly before searching so the user can type in some more
    // words to find there person. Just so there isn't a api call every single letter
    const searchForUsers = (value: string) => {
        if (isLocked) {
            return;
        }
        setIsLocked(true);
        setTimeout(async () => {
            // search for users using api
            const concatenatedValue = value.toLowerCase().trim().replace(/\s/g, "");
            const response = await getRequest<IPlayer[]>(
                `/players/search?name=${concatenatedValue}`
            );
            if (isErrorResponse(response)) {
                setIsLocked(false);
                return;
            }
            setPlayers(response);
            setIsLocked(false);
        }, 700);
    };

    const inviteUser = async (authId: string) => {
        const response = await postRequest(`/players/${authId}/requests/teams/${teamId}`);
        if (isErrorResponse(response)) {
            return;
        }

        console.log("invite sent");
    };

    return (
        // <Popup trigger={<button>Invite Members</button>} modal>
        <div style={{ backgroundColor: "grey" }}>
            <h6>Search for person to invite to your team</h6>
            <input type="text" name="search" onChange={(e) => searchForUsers(e.target.value)} />
            <br />
            <select onChange={(e) => setOption(e.target.value)} value={option}>
                {players?.map((player, index) => (
                    <option key={index} value={player.authId}>
                        {player.firstName} {player.lastName}
                    </option>
                ))}
            </select>
            {/* Function to invite player
                Probably use HOC to render loading symbol until request completes */}
            <button onClick={() => inviteUser(option)}>Invite</button>
        </div>
        // </Popup>
    );
}

export default InviteMembers;
