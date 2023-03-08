import React from "react";
import { useNavigate } from "react-router-dom";
import { IRosterPlayer } from "../../interfaces/IPlayer";

interface IRoster {
    roster: IRosterPlayer[];
}
function Roster({ roster }: IRoster) {
    const navigate = useNavigate();
    // <Table className={classes.container}>
    //         <thead>
    //             <tr>
    //                 <th> </th>
    //                 <th>First Name</th>
    //                 <th>Last Name</th>
    //                 <th>Gender</th>
    //                 <th>Role</th>
    //                 <th>Status</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {players.map((player, index) => (
    //                 <tr key={index}>
    //                     <td>
    //                         <img src={player.image} alt="Profile" />
    //                     </td>
    //                     <td>{player.firstName}</td>
    //                     <td>{player.lastName}</td>
    //                     <td>{player.gender}</td>
    //                     <td>{player.role}</td>
    //                     <td>{player.status}</td>
    //                     <td>
    //                         <button onClick={() => findPlayer(player.authId)}>View</button>
    //                     </td>
    //                     <td>
    //                         <button onClick={() => findPlayer(player.authId)}>Kick</button>
    //                     </td>
    //                     <td>
    //                         <button onClick={() => findPlayer(player.authId)}>Promote</button>
    //                     </td>
    //                 </tr>
    //             ))}
    //         </tbody>
    // </Table>
    const findPlayer = (id: string) => {
        navigate(`/players/${id}`);
        // make api call to load player and probably navigate to new window
        // showing player window
    };

    return (
        <div className="container" id="roster">
            <h1>Roster</h1>
            {roster.map((player, index) => {
                return (
                    <div key={index}>
                        <span>
                            {`${player.firstName}, ${player.lastName} - ${player.gender} || ${player.role}, ${player.status}`}{" "}
                            <button onClick={() => navigate(`/players/${player.authId}`)}>
                                View
                            </button>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default Roster;
