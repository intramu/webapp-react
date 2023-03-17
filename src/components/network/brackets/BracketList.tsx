import React from "react";
import { IBracket } from "../../../interfaces/competition/IBracket";
import { BracketBox } from "./BracketBox";

interface IBracketList {
    brackets: IBracket[];
}
function BracketList({ brackets }: IBracketList) {
    return (
        <>
            {brackets.map((bracket, index) => (
                <BracketBox key={index} bracket={bracket} maxTeamSize={12} />
            ))}
        </>
    );
}

export default BracketList;
