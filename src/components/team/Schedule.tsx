import React from "react";
import { observer } from "mobx-react-lite";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { TeamModel } from "../../models/team/TeamModel";
import { StyledTableCell, StyledTableRow } from "./Roster";

interface ScheduleProps {
    team: TeamModel;
}

export const Schedule = observer(({ team }: ScheduleProps) => {
    const {
        contestGameStore: { games },
    } = team;

    const navigate = useNavigate();

    const dateFormat = (date: dayjs.Dayjs) => {
        if (!date) {
            return "TBD";
        }
        return (
            <span>
                {date.month()} {date.day()}
            </span>
        );
    };

    const showScore = (homeScore: number, awayScore: number) => {
        if (!homeScore || !awayScore) {
            return "TBD";
        }

        return (
            <>
                {/* <span>W</span> */}
                {`${awayScore} - ${homeScore}`}
            </>
        );
    };

    return (
        <>
            <h3>Schedule</h3>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell css={{ padding: 0 }} align="left">
                                Date
                            </TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Opposing Team</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games.map((game) => {
                            console.log(game);

                            // const homeTeam =
                            //     game.homeTeam.id === team.id ? game.homeTeam : game.awayTeam;
                            const awayTeam =
                                game.awayTeam.id === team.id ? game.homeTeam : game.awayTeam;

                            return (
                                <StyledTableRow
                                    key={game.id}
                                    onClick={() => navigate(`/network/games/${game.id}`)}>
                                    <StyledTableCell>{dateFormat(game.gameDate)}</StyledTableCell>
                                    <StyledTableCell>
                                        {showScore(game.scoreHome, game.scoreAway)}
                                    </StyledTableCell>
                                    <StyledTableCell>VS {awayTeam.name}</StyledTableCell>
                                    <StyledTableCell>
                                        {game.gameDate?.hour() ?? "TBD"}
                                    </StyledTableCell>
                                    <StyledTableCell>@{game.location.name}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
});
