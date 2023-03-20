import React from "react";
import { IDivision } from "../../../interfaces/competition/IDivision";
import DivisionBox from "./DivisionBox";

interface IDivisionList {
    divisions: IDivision[];
}

function DivisionList({ divisions }: IDivisionList) {
    return (
        <div>
            {divisions.map((division) => (
                <DivisionBox key={division.id} division={division} />
            ))}
        </div>
    );
}

export default DivisionList;
