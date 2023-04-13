import React, { useState } from "react";
import { IBracket, ITimeRange } from "../../../interfaces/competition/IBracket";
import TeamRow from "../teams/TeamRow";
import { BracketModel } from "../../../models/contests/BracketModel";

interface IBracketBox {
    bracket: BracketModel;
}

function BracketBox({ bracket }: IBracketBox) {
    const createTeam = () => {
        // create team in bracket waitlist
    };

    return <div>Woah</div>;
    // function showTimes() {
    //     let time = "";
    //     bracket.timeChoices.forEach((choice) => {
    //         time += `, ${choice.startTime}`;
    //     });

    //     return time;
    // }

    // if (bracket.maxTeamAmount > 0) {
    //     return (
    //         <div>
    //             <b>{bracket.dayChoices}</b>
    //             <b>{showTimes()}</b>

    //             {bracket.teams.length === 0 ? (
    //                 <div>No Teams</div>
    //             ) : (
    //                 <div>
    //                     {bracket.teams.map((team, index) => (
    //                         <TeamRow key={index} team={team} />
    //                     ))}
    //                 </div>
    //             )}
    //         </div>
    //     );
    // }

    // return (
    //     <div>
    //         <b>Waitlist</b>

    //         {/* render team cards here */}
    //         {bracket.teams.length === 0 ? (
    //             <div>No Teams</div>
    //         ) : (
    //             <div>
    //                 {bracket.teams.map((team, index) => (
    //                     <TeamRow key={index} team={team} />
    //                 ))}
    //             </div>
    //         )}
    //         <button onClick={() => createTeam()}>Create Team</button>
    //     </div>
    // );
}

export default BracketBox;
