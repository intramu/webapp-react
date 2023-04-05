import { useAuth0 } from "@auth0/auth0-react";
import {
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableRow,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExSport, Role } from "../../common/enums";
import useAxios from "../../common/hooks/useAxios";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IRosterPlayer } from "../../interfaces/IPlayer";
import { TestTeamModel } from "../../models/TestTeamModel";
import InviteMembers from "./InviteMembers";

interface RosterProps {
    team: TestTeamModel;
}

// export function Roster({ team }: RosterProps) {
export const Roster = observer(({ team }: RosterProps) => {
    // })
    const navigate = useNavigate();
    const { putRequest, deleteRequest } = useAxios();
    const { getAccessTokenSilently } = useAuth0();

    /** Updates player role and updates the state */
    const updatePlayerRole = async (authId: string, role: Role) => {
        const token = await getAccessTokenSilently();
        const player = team.players.find((x) => x.authId === authId);
        player?.updateRole(role, team.id, token);
    };

    /** Removes player from team
     * Leaving here in case axios interceptor proves not to work correctly
     */
    const kickPlayer = async (authId: string) => {
        team.removePlayer(authId);
    };

    return (
        <>
            <h3>Roster</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableBody>
                        {team.players.map((player) => (
                            <StyledTableRow
                                key={player.authId}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <StyledTableCell component="th" scope="row">
                                    {player.firstName} {player.lastName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{player.gender}</StyledTableCell>
                                <StyledTableCell align="right">{player.role}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {![Role.COCAPTAIN, Role.CAPTAIN].includes(player.role) && (
                                        <button onClick={() => kickPlayer(player.authId)}>
                                            Kick
                                        </button>
                                    )}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    // return (
    //     <div className="container" id="roster">
    //         <h1>Roster</h1>
    //         {players.map((player, index) => {
    //             return (
    //                 <span key={index}>
    //                     {`${player.firstName}, ${player.lastName} - ${player.gender} || ${player.role}, ${player.status}`}{" "}
    //                     {user?.sub !== player.authId && (
    //                         <span>
    //                             <button onClick={() => navigate(`/players/${player.authId}`)}>
    //                                 View
    //                             </button>

    //                             {player.role === Role.PLAYER && (
    //                                 <button
    //                                     onClick={() =>
    //                                         updatePlayerRole(player.authId, Role.COCAPTAIN)
    //                                     }>
    //                                     Promote
    //                                 </button>
    //                             )}
    //                             {player.role === Role.COCAPTAIN && (
    //                                 <button
    //                                     onClick={() =>
    //                                         updatePlayerRole(player.authId, Role.PLAYER)
    //                                     }>
    //                                     Demote
    //                                 </button>
    //                             )}
    //                             {![Role.COCAPTAIN, Role.CAPTAIN].includes(player.role) && (
    //                                 <button onClick={() => kickPlayer(player.authId)}>Kick</button>
    //                             )}
    //                         </span>
    //                     )}
    //                     <br />
    //                 </span>
    //             );
    //         })}
    //         {/* <InviteMembers teamId={teamId} /> */}
    //     </div>
    // );
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
