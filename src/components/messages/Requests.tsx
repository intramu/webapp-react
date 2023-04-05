import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { PlayerInviteModel } from "../../models/PlayerInviteModel";

export const Requests = observer(() => {
    const [player] = useState(() => new PlayerInviteModel());

    const acceptInvite = async (teamId: number) => {
        player.acceptInvite(teamId);
    };

    const declineInvite = (teamId: number) => {
        player.declineInvite(teamId);
    };

    useEffect(() => {
        player.fetchRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>
                {player.invites.map((invite) => (
                    <span key={invite.requestingTeamName}>
                        <b>{invite.requestingPlayerFullName}</b> wants you to join their team,{" "}
                        <b>{invite.requestingTeamName}</b>
                        <button onClick={() => acceptInvite(invite.teamId)}>Accept</button>
                        <button onClick={() => declineInvite(invite.teamId)}>
                            Reject (Doesnt work)
                        </button>
                    </span>
                ))}
                {player.invites.length === 0 && <span>No Requests</span>}
            </div>
            {player.state === "pending" && <span>Loading</span>}
            <button onClick={player.fetchRequests}>Refresh</button>
        </>
    );
});
export default Requests;
