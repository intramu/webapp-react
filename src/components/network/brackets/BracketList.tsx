import React from "react";
import { IBracket } from "../../../interfaces/competition/IBracket";
import BracketBox from "./BracketBox";

interface IBracketList {
    brackets: IBracket[];
}
function BracketList({ brackets }: IBracketList) {
    return (
        <div style={{ marginLeft: "20px" }}>
            {brackets.map((bracket, index) => (
                <BracketBox key={index} bracket={bracket} />
            ))}
        </div>
    );
}

export default BracketList;
