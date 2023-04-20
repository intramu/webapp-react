import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import { CSSObject } from "@emotion/react";
import { RosterPlayerModel } from "../../../models/team/RosterPlayerModel";
import { TeamModel } from "../../../models/team/TeamModel";
import { TeamRole } from "../../../utilities/enums/teamEnum";
import { StyledTableCell } from "../Roster";
import { standardFontSizes } from "../../../styles/player/common";

interface RowProps {
    currentRole: string;
    player: RosterPlayerModel;
    team: TeamModel;
}

export const RosterRow = observer(({ currentRole, player, team }: RowProps) => {
    // console.log("player", player.role);
    // console.log("current", currentRole);

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
                <StyledTableCell css={{ padding: 0 }}>
                    {player.role === "COCAPTAIN" ? (
                        <Button
                            onClick={() => team.updatePlayerRole(player.authId, TeamRole.PLAYER)}>
                            Demote
                        </Button>
                    ) : (
                        <Button
                            onClick={() =>
                                team.updatePlayerRole(player.authId, TeamRole.COCAPTAIN)
                            }>
                            Promote
                        </Button>
                    )}
                </StyledTableCell>
                <StyledTableCell css={{ padding: 0 }}>
                    <Button onClick={() => team.removePlayer(player.authId)}>Kick</Button>
                </StyledTableCell>
            </>
        );
    }
    if (currentRole === "COCAPTAIN") {
        if (player.role === "PLAYER") {
            return (
                <>
                    <StyledTableCell>
                        <Button
                            onClick={() => team.updatePlayerRole(player.authId, TeamRole.PLAYER)}>
                            Promote
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                        <Button onClick={() => team.removePlayer(player.authId)}>Kick</Button>
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
