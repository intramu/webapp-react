import React, { useEffect, useState } from "react";
import { ContestGameModel } from "../../../models/contests/ContestGameModel";
import { flexRow } from "../../../styles/player/common";
import { newGetRequest } from "../../../common/functions/axiosRequests";
import { isErrorResponse } from "../../../interfaces/ErrorResponse";

interface props {
    reportingScore?: boolean;
    setGame?(id: ContestGameModel): void;
}
export function GameList({ reportingScore, setGame }: props) {
    const [games, setGames] = useState<ContestGameModel[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await newGetRequest<ContestGameModel[]>("/brackets/contests/games");
            if (isErrorResponse(response)) {
                return;
            }
            setGames(response);
        };
        fetch();
    }, []);

    return (
        <>
            <h2>Current Games</h2>
            <div>
                {games.map((game) => (
                    <div key={game.id} css={[flexRow, { borderBottom: "1px solid black" }]}>
                        <b>{game.id}</b>
                        <div css={{ display: "flex", textAlign: "center", width: "100%" }}>
                            <span css={{ flex: 2 }}>
                                {game.awayTeam.name} | Status: {game.statusAway} | Score:{" "}
                                {game.scoreAway ?? "TBD"}
                            </span>
                            <span css={{ flex: 1 }}>VS</span>
                            <span css={{ flex: 2 }}>
                                {game.homeTeam.name} | Status: {game.statusHome} | Score:{" "}
                                {game.scoreHome ?? "TBD"}
                            </span>
                            <span css={{ flex: 1 }}>
                                @{game.gameDate ? game.gameDate.toString() : "TBD"}
                            </span>
                            {reportingScore && setGame && (
                                <button onClick={() => setGame(game)}>Report Score</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
GameList.defaultProps = {
    reportingScore: false,
    setGame: null,
};
