import React, { useEffect } from "react";
import { IBracket } from "../../../interfaces/competition/IBracket";
import BracketBox from "./BracketBox";
import { BracketModel } from "../../../models/contests/BracketModel";

interface IBracketList {
    brackets: BracketModel[];
}
function BracketList({ brackets }: IBracketList) {
    return (
        <>
            {brackets.map((bracket, index) => (
                <BracketBox key={index} bracket={bracket} />
            ))}
        </>
    );
}

export default BracketList;
