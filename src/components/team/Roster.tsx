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
import useAxios from "../../common/hooks/useAxios";
import { IRosterPlayer } from "../../interfaces/IPlayer";
import { TestTeamModel } from "../../models/TestTeamModel";
import { TeamRole, TeamVisibility } from "../../utilities/enums/teamEnum";
import InviteMembers from "./InviteMembers";

interface RosterProps {
    team: TestTeamModel;
}

// export function Roster({ team }: RosterProps) {
export const Roster = observer(({ team }: RosterProps) => {
    const navigate = useNavigate();

    const { putRequest, deleteRequest } = useAxios();
    const { user } = useAuth0();

    const [currentRole, setCurrentRole] = useState("PLAYER");

    console.log(currentRole);

    // const { removePlayer } = team;

    /** Updates player role and updates the state */
    const updatePlayerRole = async (authId: string, role: TeamRole) => {
        // const token = await getAccessTokenSilently();
        // const player = team.players.find((x) => x.authId === authId);
        // player.updateRole(role, team.id, token);
    };

    useEffect(() => {
        // setCurrentRole(
        //     team.players.find((player) => player.authId === user?.sub)?.role ?? "VISITOR"
        // );
        setCurrentRole("CAPTAIN");
    }, [team.players, user?.sub]);

    function CommonTable({ children }: { children: React.ReactElement }) {
        return (
            <>
                <h1>Roster</h1>
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
                                    {React.cloneElement(children, { player })}
                                    {children}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }

    // if (currentRole === TeamRole.VISITOR) {
    //     return (
    //         <StyledTableCell align="right">
    //             {team.visibility === TeamVisibility.PRIVATE && (
    //                 <button onClick={() => console.log(`${user?.sub} wants to join`)}>
    //                     Request
    //                 </button>
    //             )}

    //             {team.visibility === TeamVisibility.PUBLIC && (
    //                 <button onClick={() => console.log(`${user?.sub} joined the team`)}>
    //                     Join
    //                 </button>
    //             )}
    //         </StyledTableCell>
    //     );
    // }

    // if (currentRole === TeamRole.PLAYER) {
    //     return (
    //         <CommonTable>
    //             <StyledTableCell align="right">
    //                 <button onClick={() => console.log(`${user?.sub} wants to leave the team`)}>
    //                     Leave
    //                 </button>
    //             </StyledTableCell>
    //         </CommonTable>
    //     );
    // }

    // if (currentRole === TeamRole.COCAPTAIN) {
    //     return (
    //         <CommonTable>
    //             <div>what</div>
    //             {/* <StyledTableCell align="right">
    //                 {player.role === Role.PLAYER && (
    //                     <button onClick={() => updatePlayerRole(player.authId, Role.COCAPTAIN)}>
    //                         Promote
    //                     </button>
    //                 )}
    //                 {player.role === Role.COCAPTAIN && (
    //                     <button onClick={() => updatePlayerRole(player.authId, Role.PLAYER)}>
    //                         Demote
    //                     </button>
    //                 )}
    //                 {![Role.COCAPTAIN, Role.CAPTAIN].includes(player.role) && (
    //                     <button onClick={() => removePlayer(player.authId)}>Kick</button>
    //                 )}
    //             </StyledTableCell> */}
    //         </CommonTable>
    //     );
    // }

    // all players in roster should be clickable to view their profile page

    // visitor
    // you see no buttons

    // player
    // you see leave button

    // cocaptain
    // you can kick or promote players or leave

    // captain
    // you can kick, promote, demote any players. can leave
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
                                    {player.authId === user?.sub && (
                                        <button
                                            onClick={() =>
                                                console.log(`${user?.sub} wants to leave the team`)
                                            }>
                                            Leave
                                        </button>
                                    )}

                                    {currentRole === TeamRole.COCAPTAIN &&
                                        player.role === TeamRole.PLAYER && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updatePlayerRole(
                                                            player.authId,
                                                            TeamRole.COCAPTAIN
                                                        )
                                                    }>
                                                    Promote
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        team.removePlayer(player.authId)
                                                    }>
                                                    Kick
                                                </button>
                                            </>
                                        )}

                                    {currentRole === TeamRole.CAPTAIN &&
                                        player.role === TeamRole.PLAYER && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updatePlayerRole(
                                                            player.authId,
                                                            TeamRole.COCAPTAIN
                                                        )
                                                    }>
                                                    Promote
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        team.removePlayer(player.authId)
                                                    }>
                                                    Kick
                                                </button>
                                            </>
                                        )}
                                    {player.role === TeamRole.COCAPTAIN && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    // player.updateRole(TeamRole.PLAYER, team.id)
                                                    team.updatePlayerRole(
                                                        player.authId,
                                                        TeamRole.PLAYER
                                                    )
                                                }>
                                                Demote
                                            </button>
                                            <button
                                                onClick={() => team.removePlayer(player.authId)}>
                                                Kick
                                            </button>
                                        </>
                                    )}
                                </StyledTableCell>

                                {/* {currentRole === TeamRole.COCAPTAIN && (
                                    <StyledTableCell align="right">
                                        {player.role === TeamRole.PLAYER && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updatePlayerRole(
                                                            player.authId,
                                                            TeamRole.COCAPTAIN
                                                        )
                                                    }>
                                                    Promote
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        team.removePlayer(player.authId)
                                                    }>
                                                    Kick
                                                </button>
                                            </>
                                        )}
                                    </StyledTableCell>
                                )} */}

                                {/* {currentRole === TeamRole.CAPTAIN && (
                                    <StyledTableCell align="right">
                                        {player.role === TeamRole.PLAYER && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updatePlayerRole(
                                                            player.authId,
                                                            TeamRole.COCAPTAIN
                                                        )
                                                    }>
                                                    Promote
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        team.removePlayer(player.authId)
                                                    }>
                                                    Kick
                                                </button>
                                            </>
                                        )}
                                        {player.role === TeamRole.COCAPTAIN && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updatePlayerRole(
                                                            player.authId,
                                                            TeamRole.COCAPTAIN
                                                        )
                                                    }>
                                                    Demote
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        team.removePlayer(player.authId)
                                                    }>
                                                    Kick
                                                </button>
                                            </>
                                        )}
                                    </StyledTableCell> */}
                                {/* <StyledTableCell align="right">
                                        {currentRole && }
                                        {![Role.COCAPTAIN, Role.CAPTAIN].includes(player.role) && (
                                            <button onClick={() => removePlayer(player.authId)}>
                                                Kick
                                            </button>
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {![Role.COCAPTAIN, Role.CAPTAIN].includes(player.role) && (
                                            <button onClick={() => removePlayer(player.authId)}>
                                                Kick
                                            </button>
                                        )}
                                    </StyledTableCell> */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!team.players.some((player) => player.authId === user?.sub) &&
                currentRole === TeamRole.VISITOR && (
                    <>
                        {team.visibility === TeamVisibility.PRIVATE && (
                            <button onClick={() => console.log(`${user?.sub} wants to join`)}>
                                Request
                            </button>
                        )}

                        {team.visibility === TeamVisibility.PUBLIC && (
                            <button onClick={() => console.log(`${user?.sub} joined the team`)}>
                                Join
                            </button>
                        )}
                    </>
                )}
        </>
    );

    // return (
    //     <div className="container" id="roster">
    //         <h1>Roster</h1>
    //         {team.players.map((player, index) => {
    //             return (
    //                 <span key={index}>
    //                     {`${player.firstName}, ${player.lastName} - ${player.gender} || ${player.role}, ${player.status}`}{" "}
    //                     {/* {user?.sub !== player.authId && ( */}
    // <span>
    //     <button onClick={() => navigate(`/players/${player.authId}`)}>
    //         View
    //     </button>

    //     {player.role === Role.PLAYER && (
    //         <button
    //             onClick={() => updatePlayerRole(player.authId, Role.COCAPTAIN)}>
    //             Promote
    //         </button>
    //     )}
    //     {player.role === Role.COCAPTAIN && (
    //         <button
    //             onClick={() => updatePlayerRole(player.authId, Role.PLAYER)}>
    //             Demote
    //         </button>
    //     )}
    //     {![Role.COCAPTAIN, Role.CAPTAIN].includes(player.role) && (
    //         <button onClick={() => removePlayer(player.authId)}>Kick</button>
    //     )}
    // </span>
    //                     {/* )} */}
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
