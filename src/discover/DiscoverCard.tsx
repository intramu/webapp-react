import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    container: {
        border: "1px solid red",
    },
});

// ! REVISIT
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DiscoverCard({ team, ...props }: any): JSX.Element {
    const classes = useStyles();
    const [roster, setRoster] = useState([]);
    const [userStatus, setUserStatus] = useState(false);

    useEffect(() => {
        setRoster(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props.roster.map((player: any, index: number) => {
                console.log(player);
                isUserOnTeam(player.AUTH_ID);
                return (
                    <option key={index} value={player}>
                        {player.FIRST_NAME}
                    </option>
                );
            })
        );
        // ! REVISIT - this could be an error that leads to unexpected behavior
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ! REVISIT
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isUserOnTeam = (rosterId: any) => {
        if (rosterId === props.currentPlayerId) setUserStatus(true);
    };

    return (
        <div className={classes.container}>
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
                <button onClick={() => props.requestToJoinTeam(team.id)}>Request to Join</button>
            )}
        </div>
    );
}
