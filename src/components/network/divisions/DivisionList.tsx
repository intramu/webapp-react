import React from "react";
import DivisionBox from "./DivisionBox";
import { DivisionModel } from "../../../models/contests/DivisionModel";

interface IDivisionList {
    divisions: DivisionModel[];
}

function DivisionList({ divisions }: IDivisionList) {
    return (
        <>
            {divisions.map((division) => (
                <DivisionBox key={division.id} division={division} />
            ))}
        </>
    );
}

export default DivisionList;
