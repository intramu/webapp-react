import React, { useEffect } from "react";
import { IBracket } from "../../../interfaces/competition/IBracket";
import BracketBox from "./BracketBox";
import { BracketModel } from "../../../models/contests/BracketModel";

interface IBracketList {
    brackets: BracketModel[];
}
function BracketList({ brackets }: IBracketList) {
    useEffect(() => {
        brackets.forEach((bracket) => console.log(bracket.maxTeamAmount));
    });

    return (
        <div style={{ marginLeft: "20px" }}>
            {brackets.map((bracket, index) => (
                <BracketBox key={index} bracket={bracket} />
            ))}
        </div>
    );
}

export default BracketList;
