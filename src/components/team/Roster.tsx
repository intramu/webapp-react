import React, { useEffect, useState } from "react";
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
import { observer } from "mobx-react-lite";
import { TeamModel } from "../../models/team/TeamModel";
import { userRootStore } from "../../pages/_routes";
import { standardFontSizes } from "../../styles/player/common";
import { RosterRow } from "./roster/Row";

interface RosterProps {
    team: TeamModel;
}

// const button: CSSObject = {
//     fontSize: standardFontSizes.sm,
//     fontStyle: "italic",
// };

export const Roster = observer(({ team }: RosterProps) => {
    const { player: user } = userRootStore;
    // const navigate = useNavigate();

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
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
});

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
