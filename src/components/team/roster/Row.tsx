import React from "react";
import { observer } from "mobx-react-lite";
import { RosterPlayerModel } from "../../../models/team/RosterPlayerModel";
import { TeamModel } from "../../../models/team/TeamModel";
import { TeamRole } from "../../../utilities/enums/teamEnum";
import { StyledTableCell } from "../Roster";

interface RowProps {
    currentRole: string;
    player: RosterPlayerModel;
    team: TeamModel;
}
export const RosterRow = observer(({ currentRole, player, team }: RowProps) => {
    console.log("player", player.role);
    console.log("current", currentRole);

    if (currentRole === "CAPTAIN") {
        if (player.role === "CAPTAIN") {
            return (
                <>
                    <StyledTableCell> </StyledTableCell>
                    <StyledTableCell> </StyledTableCell>
                </>
            );
        }
        return (
            <>
                <StyledTableCell>
                    {player.role === "COCAPTAIN" ? (
                        <button
                            onClick={() => team.updatePlayerRole(player.authId, TeamRole.PLAYER)}>
                            Demote
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                team.updatePlayerRole(player.authId, TeamRole.COCAPTAIN)
                            }>
                            Promote
                        </button>
                    )}
                </StyledTableCell>
                <StyledTableCell>
                    <button onClick={() => team.removePlayer(player.authId)}>Kick</button>
                </StyledTableCell>
            </>
        );
    }
    if (currentRole === "COCAPTAIN") {
        if (player.role === "PLAYER") {
            return (
                <>
                    <StyledTableCell>
                        <button
                            onClick={() => team.updatePlayerRole(player.authId, TeamRole.PLAYER)}>
                            Promote
                        </button>
                    </StyledTableCell>
                    <StyledTableCell>
                        <button onClick={() => team.removePlayer(player.authId)}>Kick</button>
                    </StyledTableCell>
                </>
            );
        }
        return (
            <>
                <StyledTableCell> </StyledTableCell>
                <StyledTableCell> </StyledTableCell>
            </>
        );
    }
    return (
        <>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
        </>
    );
});
