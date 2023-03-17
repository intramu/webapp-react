/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useState } from "react";
import { IBracket } from "../../../interfaces/competition/IBracket";
import { sizes } from "../../../styles/scss/player/commonStyles";
import TeamRow from "../teams/TeamRow";

interface IBracketBox {
    bracket: IBracket;
    maxTeamSize: number;
}

const test = {
    container: css({
        backgroundColor: "grey",
        width: sizes.containerWidth,
        position: "relative",
        borderRadius: sizes.containerRadius,
        margin: "1em",
        padding: "1em",
    }),
};

export function BracketBox({ bracket, maxTeamSize }: IBracketBox) {
    const createTeam = () => {
        // create team in bracket waitlist
    };

    console.log(bracket);

    return (
        <div>
            {/* will be changed later with database update */}
            {bracket.maxTeamAmount > 100 ? (
                <span>Waitlist</span>
            ) : (
                <span>
                    {bracket.dayChoices.map((day, index) => (
                        <span key={index}>{day} - </span>
                    ))}
                </span>
            )}
            <hr />
            <div>
                {bracket.teams.map((team, index) => (
                    <TeamRow key={index} team={team} maxTeamSize={maxTeamSize} />
                ))}
                <button onClick={() => createTeam()}>Create Team</button>
            </div>
        </div>
    );
}
