import React from "react";
import { useParams } from "react-router-dom";
import { Visibility } from "../../common/enums";
import useSWR from "../../common/hooks/useSWR";
import { IPlayer } from "../../interfaces/IPlayer";

function OnePlayer() {
    const { userId } = useParams();

    const { data: player, error, isLoading } = useSWR<IPlayer>(`/players/search/${userId}`);

    console.log(player);

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

export default OnePlayer;
