import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import PlayerRoster from "../team/components/PlayerRoster";

const useStyles = createUseStyles({
    container: {
        border: "1px solid red",
    },
});

export default function DiscoverCard({ team, ...props }) {
    const classes = useStyles();
    const [roster, setRoster] = useState([]);
    const [userStatus, setUserStatus] = useState(false);

    useEffect(() => {
        setRoster(
            props.roster.map((player, index) => {
                console.log(player);
                isUserOnTeam(player.AUTH_ID);
                return (
                    <option key={index} value={player}>
                        {player.FIRST_NAME}
                    </option>
                );
            })
        );
    }, []);

    const isUserOnTeam = (rosterId) => {
        if (rosterId === props.currentPlayerId) setUserStatus(true);
    };

    return (
        <div className={classes.container} onClick={() => console.log("click")}>
            <h3>{team.sport}</h3>
            <h1>{team.name}</h1>
            <p>
                Record- W: {team.wins} | T: {team.ties} | L: {team.losses}
            </p>
            <div>
                <h4>Roster</h4>
                <select className="roster" id="roster">
                    {/* <PlayerRoster /> */}
                    {roster}
                </select>
            </div>
            <span>M: 4 | W: 5</span>
            <span>{userStatus ? "My Team" : ""}</span>
            {/* Belong in a different type of card for a team view rather than a network view *
            <span>Invite Members</span>
            <span>Schedule</span>
            <span>Settings</span> */}

            {/** When a team posesses a visibility value of open the button is
             * displayed. When this button is pressed it passes the id value
             * back up to the parent function
             */}
            <span>{team.visibility}</span>
            {team.visibility === "OPEN" && !userStatus && (
                <button onClick={() => props.joinTeam(team.id)}>Join</button>
            )}
            {team.visibility === "PRIVATE" && !userStatus && (
                <button onClick={() => props.requestToJoinTeam(team.id)}>
                    Request to Join
                </button>
            )}
        </div>
    );
}

// {
//     (()=>{
//         switch(props.visibility){

//         }
//     })

// }

{
    /* {() => {
                switch (props.visibility) {
                    case "OPEN":
                        <button onClick={() => props.joinTeam(props.id)}>
                            Join
                        </button>;
                        break;
                }
            }} */
}
