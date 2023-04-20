/** @jsxImportSource @emotion/react */
import { useAuth0 } from "@auth0/auth0-react";
import {
    Button,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableRow,
} from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { CSSObject } from "@emotion/react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../common/hooks/useAxios";
import { IRosterPlayer } from "../../interfaces/IPlayer";
import { TeamModel } from "../../models/team/TeamModel";
import { TeamRole, TeamVisibility } from "../../utilities/enums/teamEnum";
import InviteMembers from "./InviteMembers";
import { userRootStore } from "../../pages/_routes";
import { unstyledButton } from "../../styles/player/buttons";
import { colors, standardFontSizes } from "../../styles/player/common";
import { RosterPlayerModel } from "../../models/team/RosterPlayerModel";
import { RosterRow } from "./roster/Row";

interface RosterProps {
    team: TeamModel;
}

const button: CSSObject = {
    fontSize: standardFontSizes.sm,
    fontStyle: "italic",
};

export const Roster = observer(({ team }: RosterProps) => {
    const { player: user } = userRootStore;
    const navigate = useNavigate();

    // useEffect(() => {
    //     currentTeam.fetchTeam(18);
    // }, [currentTeam]);

    const [currentRole, setCurrentRole] = useState("");

    // console.log(currentRole);
    // console.log(toJS(team.players[0].updateRole));

    // const { removePlayer } = team;

    /** Updates player role and updates the state */
    // const updatePlayerRole = async (authId: string, role: TeamRole) => {
    //     // const token = await getAccessTokenSilently();
    //     // const player = team.players.find((x) => x.authId === authId);
    //     // player.updateRole(role, team.id, token);
    // };

    useEffect(() => {
        setCurrentRole(
            team.players.find((player) => player.authId === user.authId)?.role ?? "VISITOR"
        );
    }, [team.players, user.authId]);

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
                                <StyledTableCell padding="normal">
                                    {player.role === "CAPTAIN" && <MilitaryTechIcon />}
                                </StyledTableCell>
                                <StyledTableCell padding="none">
                                    {player.firstName} {player.lastName}
                                </StyledTableCell>
                                <StyledTableCell padding="none" align="right">
                                    {player.gender}
                                </StyledTableCell>
                                <StyledTableCell align="right">{player.role}</StyledTableCell>
                                <RosterRow currentRole={currentRole} player={player} team={team} />
                                <StyledTableCell padding="none">
                                    {player.authId === user.authId && <Button>Leave</Button>}
                                </StyledTableCell>
                                {/* <StyledTableCell>
                                    <button
                                        onClick={() => player.updateRole(TeamRole.PLAYER, team.id)}>
                                        demote
                                    </button>
                                </StyledTableCell> */}
                                {/* {currentRole === TeamRole.CAPTAIN && (
                                    <>
                                        <StyledTableCell> </StyledTableCell>
                                        <StyledTableCell>
                                            <button>Leave</button>
                                        </StyledTableCell>
                                    </>
                                )}
                                {currentRole === TeamRole.COCAPTAIN &&
                                    player.role === TeamRole.PLAYER && (
                                        <>
                                            <StyledTableCell>
                                                <button
                                                    onClick={() =>
                                                        updatePlayerRole(
                                                            player.authId,
                                                            TeamRole.COCAPTAIN
                                                        )
                                                    }>
                                                    Promote
                                                </button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <button
                                                    onClick={() =>
                                                        team.removePlayer(player.authId)
                                                    }>
                                                    Kick
                                                </button>
                                            </StyledTableCell>
                                        </>
                                    )}

                                {currentRole === TeamRole.CAPTAIN &&
                                    player.role === TeamRole.PLAYER && (
                                        <>
                                            <StyledTableCell>
                                                <button
                                                    onClick={() =>
                                                        updatePlayerRole(
                                                            player.authId,
                                                            TeamRole.COCAPTAIN
                                                        )
                                                    }>
                                                    Promote
                                                </button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <button
                                                    onClick={() =>
                                                        team.removePlayer(player.authId)
                                                    }>
                                                    Kick
                                                </button>
                                            </StyledTableCell>
                                        </>
                                    )}
                                {player.role === TeamRole.COCAPTAIN && (
                                    <>
                                        <StyledTableCell>
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
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <button
                                                onClick={() => team.removePlayer(player.authId)}>
                                                Kick
                                            </button>
                                        </StyledTableCell>
                                    </>
                                )} */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* {!team.players.some((player) => player.authId === user.authId) &&
                currentRole === TeamRole.VISITOR && (
                    <>
                        {team.visibility === TeamVisibility.PRIVATE && (
                            <button onClick={() => console.log(`${user.authId} wants to join`)}>
                                Request
                            </button>
                        )}

                        {team.visibility === TeamVisibility.PUBLIC && (
                            <button onClick={() => console.log(`${user.authId} joined the team`)}>
                                Join
                            </button>
                        )}
                    </>
                )} */}
        </>
    );
});

// interface RowProps {
//     currentRole: string;
//     player: RosterPlayerModel;
//     team: TeamModel;
// }
// const FirstRow = observer(({ currentRole, player, team }: RowProps) => {
//     if (currentRole === "CAPTAIN") {
//         if (player.role === "CAPTAIN") {
//             return (
//                 <>
//                     <StyledTableCell> </StyledTableCell>
//                     <StyledTableCell> </StyledTableCell>
//                 </>
//             );
//         }
//         return (
//             <>
//                 <StyledTableCell>
//                     {player.role === "COCAPTAIN" ? (
//                         <button
//                             onClick={() => team.updatePlayerRole(player.authId, TeamRole.PLAYER)}>
//                             Demote
//                         </button>
//                     ) : (
//                         <button
//                             onClick={() =>
//                                 team.updatePlayerRole(player.authId, TeamRole.COCAPTAIN)
//                             }>
//                             Promote
//                         </button>
//                     )}
//                 </StyledTableCell>
//                 <StyledTableCell>
//                     <button onClick={() => team.removePlayer(player.authId)}>Kick</button>
//                 </StyledTableCell>
//             </>
//         );
//     }
//     if (currentRole === "COCAPTAIN") {
//         if (player.role === "PLAYER") {
//             return (
//                 <>
//                     <StyledTableCell>
//                         <button
//                             onClick={() => team.updatePlayerRole(player.authId, TeamRole.PLAYER)}>
//                             Promote
//                         </button>
//                     </StyledTableCell>
//                     <StyledTableCell>
//                         <button onClick={() => team.removePlayer(player.authId)}>Kick</button>
//                     </StyledTableCell>
//                 </>
//             );
//         }
//         return (
//             <>
//                 <StyledTableCell> </StyledTableCell>
//                 <StyledTableCell> </StyledTableCell>
//             </>
//         );
//     }
//     return (
//         <>
//             <StyledTableCell> </StyledTableCell>
//             <StyledTableCell> </StyledTableCell>
//         </>
//     );
// });

// switch (currentRole) {
//     case "CAPTAIN":
//         <>
//             <StyledTableCell> </StyledTableCell>
//             <StyledTableCell>
//                 <button>Leave</button>
//             </StyledTableCell>
//         </>;
//         break;
//     case "COCAPTAIN":
//         if (player.role === TeamRole.PLAYER) {
//             return (
//                 <>
//                     <StyledTableCell>
//                         <button onClick={() => removePlayer(player.authId)}>Kick</button>
//                     </StyledTableCell>
//                 </>
//             );
//         }
//         return (
//             <>
//                 <StyledTableCell> </StyledTableCell>
//                 <StyledTableCell>
//                     <button>Leave</button>
//                 </StyledTableCell>
//             </>
//         );

//     default:
// <div>woah</div>;
// }

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: standardFontSizes.md,
        // padding: "16px 0",
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    "& button": {
        fontSize: standardFontSizes.md,
        fontStyle: "italic",
    },
}));
