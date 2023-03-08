import React, { useState } from "react";
import { ILeague } from "../../../interfaces/competition/ILeague";
import DivisionList from "../divisions/DivisionList";

function LeagueBox({ league }: { league: ILeague }) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    return (
        <div>
            <h1>{league.sport}</h1>
            {isOpen && <DivisionList divisions={league.divisions} />}
        </div>
    );
}

export default LeagueBox;
