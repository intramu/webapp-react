import React from "react";
import { observer } from "mobx-react-lite";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { NewBracket } from "./Bracket";

interface DivisionProps {
    division: DivisionModel;
    removeDivision(x: number): void;
    index: number;
}

export const NewDivision = observer(({ division, index, removeDivision }: DivisionProps) => {
    return (
        <div css={{ border: "1px solid black", margin: "0px 0px 0px 30px" }}>
            <span>Id: {division.id}</span>
            <input type="text" name="name" />
            <button onClick={() => removeDivision(index)}>Remove</button>
            <button onClick={division.pushBracket}>Add Bracket</button>

            <div>
                {division.brackets.map((bracket, bIndex) => (
                    <NewBracket
                        key={bIndex}
                        bracket={bracket}
                        index={bIndex}
                        removeBracket={division.removeBracket}
                    />
                ))}
            </div>
        </div>
    );
});
