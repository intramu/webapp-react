import React from "react";
import { GameCreator } from "../../components/admin/games/GameCreator";
import { GameList } from "../../components/admin/games/GameList";

export function Games() {
    return (
        <div>
            <h1>Game Creator</h1>
            <GameCreator />
            <div css={{ margin: "20px" }}>
                <GameList />
            </div>
        </div>
    );
}
