import React, { useState } from "react";
import { IBracket } from "../../../interfaces/competition/IBracket";
import TeamRow from "../teams/TeamRow";

interface IBracketBox {
    bracket: IBracket;
}

function BracketBox({ bracket }: IBracketBox) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const createTeam = () => {
        // create team in bracket waitlist
    };

    return (
        <div>
            <h1>{bracket.dayChoices}</h1>
            {/* render team cards here */}
            {isOpen && (
                <div>
                    {bracket.teams.map((team, index) => (
                        <TeamRow key={index} team={team} />
                    ))}
                    <button onClick={() => createTeam()}>Create Team</button>
                </div>
            )}
        </div>
    );
}

export default BracketBox;
