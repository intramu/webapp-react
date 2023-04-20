import React from "react";
import { BracketBox } from "./BracketBox";
import { BracketModel } from "../../../models/contests/BracketModel";
import { DivisionModel } from "../../../models/contests/DivisionModel";

interface IBracketList {
    brackets: BracketModel[];
    division: DivisionModel;
}
function BracketList({ brackets, division }: IBracketList) {
    return (
        <>
            {brackets.map((bracket, index) => (
                <BracketBox key={index} bracket={bracket} division={division} />
            ))}
        </>
    );
}

export default BracketList;
