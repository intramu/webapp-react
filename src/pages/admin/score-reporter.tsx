import { Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { ContestGameModel } from "../../models/contests/ContestGameModel";
import { GameList } from "../../components/admin/games/GameList";
import { ContestGameStatus } from "../../utilities/enums/competitionEnum";
import { newPatchRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";

const gameStats = {
    scoreHome: 0,
    scoreAway: 0,
    statusHome: ContestGameStatus.NOTPLAYED,
    statusAway: ContestGameStatus.NOTPLAYED,
};
export function ScoreReporter() {
    const [game, setGame] = useState<ContestGameModel>(new ContestGameModel());
    const [stats, setStats] = useState(gameStats);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStats({ ...stats, [name]: value });
    };

    const handleSubmit = async () => {
        const response = await newPatchRequest(`/contests/games/${game.id}/report`, stats);
        if (isErrorResponse(response)) {
            return;
        }

        setStats(gameStats);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div>
            <h1 css={{ marginBottom: 50 }}>Score Reporter</h1>
            {/* <h5>
                Current game: {game.homeTeam.name} VS {game.awayTeam.name}
            </h5> */}
            <Grid css={{ marginBottom: 40 }} container spacing={2}>
                <Grid item xs={6}>
                    <h3>{game.homeTeam.name || "No team selected"}</h3>
                    <TextField
                        name="scoreHome"
                        label="Home Score"
                        value={stats.scoreHome}
                        onChange={handleInputChange}
                        inputProps={{ type: "number" }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>{game.awayTeam.name || "No team selected"}</h3>
                    <TextField
                        name="scoreAway"
                        label="Away Score"
                        value={stats.scoreAway}
                        onChange={handleInputChange}
                        inputProps={{ type: "number" }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="statusHome"
                        label="Home Status"
                        onChange={handleInputChange}
                        value={stats.statusHome}
                        fullWidth
                        select>
                        <MenuItem value={0}>Select Option</MenuItem>
                        {Object.values(ContestGameStatus)
                            .filter((x) => typeof x === "string")
                            .map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="statusAway"
                        label="Away Status"
                        onChange={handleInputChange}
                        value={stats.statusAway}
                        fullWidth
                        select>
                        <MenuItem value={0}>Select Option</MenuItem>
                        {Object.values(ContestGameStatus)
                            .filter((x) => typeof x === "string")
                            .map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <Button type="button" disabled={game.id === 0} onClick={handleSubmit}>
                        Report
                    </Button>
                    {loading && <b>Loading</b>}
                </Grid>
            </Grid>
            <GameList reportingScore setGame={setGame} />
        </div>
    );
}
