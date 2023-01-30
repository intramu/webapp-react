import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

const tempPlayerList = [
    {
        id: "fff1",
        firstName: "Noah",
        lastName: "Roerig",
        email: "noahr1936@gmail.com",
        image: "",
    },
    {
        id: "fff2",
        firstName: "Stevan",
        lastName: "Perrino",
        email: "noahr1936@gmail.com",
        image: "",
    },
    {
        id: "fff3",
        firstName: "Jimmy",
        lastName: "Cannon",
        email: "noahr1936@gmail.com",
        image: "",
    },
    {
        id: "fff4",
        firstName: "Jacob",
        lastName: "Hropoff",
        email: "noahr1936@gmail.com",
        image: "",
    },
];

function InviteMembers() {
    const [isLocked, setIsLocked] = useState(false);
    const [option, setOption] = useState("");
    const [players, setPlayers] = useState([
        {
            id: "fff1",
            firstName: "Jacob",
            lastName: "Hropoff",
            email: "noahr1936@gmail.com",
            image: "",
        },
    ]);

    useEffect(() => {
        setOption(players[0].id);
    }, [players]);

    // idea here is to pause just slightly before searching so the user can type in some more
    // words to find there person. Just so there isn't a api call every single letter
    const searchForUsers = (value: string) => {
        if (isLocked) {
            return;
        }
        setIsLocked(true);
        setTimeout(() => {
            // search for users using api

            setPlayers(
                tempPlayerList.filter(
                    (player) =>
                        player.firstName.toLowerCase().includes(value.toLowerCase()) ||
                        player.lastName.toLowerCase().includes(value.toLowerCase())
                )
            );
            setIsLocked(false);
        }, 700);
    };

    return (
        <Popup trigger={<button>Invite Members</button>} modal>
            <div style={{ backgroundColor: "grey" }}>
                <h6>Search for person to invite to your team</h6>
                <input type="text" name="search" onChange={(e) => searchForUsers(e.target.value)} />
                <br />
                <select onChange={(e) => setOption(e.target.value)} value={option}>
                    {players.map((player, index) => (
                        <option key={index} value={player.id}>
                            {player.firstName} {player.lastName}
                        </option>
                    ))}
                </select>
                {/* Function to invite player
                Probably use HOC to render loading symbol until request completes */}
                <button onClick={() => console.log(option)}>Invite</button>
            </div>
        </Popup>
    );
}

export default InviteMembers;
