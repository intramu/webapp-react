import React from "react";
import { IDivision } from "../../../interfaces/competition/IDivision";
import DivisionBox from "./DivisionBox";

interface IDivisionList {
    divisions: IDivision[];
}

function DivisionList({ divisions }: IDivisionList) {
    return (
        <div style={{ marginLeft: "20px" }}>
            {divisions.map((division, index) => (
                <DivisionBox key={index} division={division} />
            ))}
        </div>
    );
}

export default DivisionList;
