import React from "react";
import { observer } from "mobx-react-lite";
import { BracketModel } from "../../../models/contests/BracketModel";

interface BracketProps {
    bracket: BracketModel;
    removeBracket(x: number): void;
    index: number;
}

export const NewBracket = observer(({ bracket, index, removeBracket }: BracketProps) => {
    return (
        <div css={{ border: "1px solid black", margin: "0px 0px 0px 30px" }}>
            <span>Id: {bracket.id}</span>
            <input type="number" name="maxTeamAmount" />
            <button onClick={() => removeBracket(index)}>Remove</button>
        </div>
    );
});
