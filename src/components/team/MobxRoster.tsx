/** @jsxImportSource @emotion/react */
import {
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ExSport, Role } from "../../common/enums";
import useAxios from "../../common/hooks/useAxios";
import { RosterPlayer } from "../../models/RosterPlayerModel";
import InviteMembers from "./InviteMembers";

interface IRoster {
    roster: RosterPlayer[];
    teamId: number;
    // updateRole: (authId: string, role: Role) => void;
    removePlayer: (authId: string) => void;
}

export const MobxRoster = observer<IRoster>(({ roster, teamId, removePlayer }) => {
    const navigate = useNavigate();
    const { putRequest, deleteRequest } = useAxios();
    const { user } = useAuth0();

    console.log("roster", roster);
    // console.log("players", players);

    // return (
    //     <>
    //         <h3>Roster</h3>
    //         {roster.map((player, index) => {
    //             return (
    //                 <span key={index}>
    //                     {`${player.firstName}, ${player.lastName} - ${player.gender} || ${player.role}, ${player.status}`}{" "}
    //                     {user?.sub !== player.authId && (
    //                         <span>
    //                             <button onClick={() => navigate(`/players/${player.authId}`)}>
    //                                 View
    //                             </button>

    //                             {player.role === Role.PLAYER && (
    //                                 <button onClick={() => player.updateRole(Role.CAPTAIN)}>
    //                                     Promote
    //                                 </button>
    //                             )}
    //                             {player.role === Role.COCAPTAIN && (
    //                                 <button onClick={() => player.updateRole(Role.COCAPTAIN)}>
    //                                     Demote
    //                                 </button>
    //                             )}
    //                             {![Role.COCAPTAIN, Role.CAPTAIN].includes(player.role) && (
    //                                 <button onClick={() => removePlayer(player.authId)}>
    //                                     Kick
    //                                 </button>
    //                             )}
    //                         </span>
    //                     )}
    //                     <br />
    //                 </span>
    //             );
    //         })}
    //         {/* <InviteMembers teamId={teamId} /> */}
    //     </>
    // );

    return (
        <>
            <h3>Roster</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableBody>
                        {roster.map((player) => (
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
                                        <button onClick={() => removePlayer(player.authId)}>
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

export default MobxRoster;
