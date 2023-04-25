import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "../../common/hooks/useSWR";
import { IPlayer } from "../../interfaces/IPlayer";

/** Returns search view on player with limited information */
export function OnePlayer() {
    const { userId } = useParams();

    const { data: player } = useSWR<IPlayer>(`/players/search/${userId}`);

    if (!player) {
        return (
            <div className="container">
                <h5>Player visibility is closed</h5>
            </div>
        );
    }

    return (
        <div className="container">
            <p>Image would be here</p>
            <h4>{`${player?.firstName} ${player?.lastName}`}</h4>
            <h6>Visibility: {player?.visibility}</h6>
        </div>
    );
}
