import React, { useState } from "react";
import { IDivision } from "../../../interfaces/competition/IDivision";
import BracketList from "../brackets/BracketList";

interface IDivisionBox {
    division: IDivision;
}

function DivisionBox({ division }: IDivisionBox) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    return (
        <div>
            <h1>{division.type}</h1>
            {isOpen && <BracketList brackets={division.brackets} />}
        </div>
    );
}

export default DivisionBox;
