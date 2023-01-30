import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import CheckPassword from "../../components/CheckPassword";

const useStyles = createUseStyles({
    container: {
        border: "1px solid red",
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TeamCard({ team, ...props }: any) {
    const classes = useStyles();
    const [roster, setRoster] = useState([]);
    // const [checkPassword, setCheckPassword] = useState(false);

    useEffect(() => {
        setRoster(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            team.roster.map((player: any, index: number) => {
                console.log(player);
                return (
                    <option key={index} value={player}>
                        {player.FIRST_NAME}
                    </option>
                );
            })
        );
        // ! REVISIT - this could be an error
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const confirmBox = () => {
    //     // eslint-disable-next-line no-alert
    //     if (window.confirm("Are you sure you want to leave?")) props.leaveTeam(team.teamId);
    // };

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

            {/* Belong in a different type of card for a team view rather than a network view *
            <span>Invite Members</span>
            <span>Schedule</span>
            <span>Settings</span> */}

            {/** When a team posesses a visibility value of open the button is
             * displayed. When this button is pressed it passes the id value
             * back up to the parent function
             */}
            <span>{props.visibility}</span>
            {/* {popup ? <Popup leaveTeam={props.leaveTeam} /> : "hello"} */}

            <CheckPassword
                toggleBlur={props.toggleBlur}
                leaveTeam={props.leaveTeam}
                teamId={team.teamId}
            />

            <button onClick={() => props.updateTeam(team.teamId)}>Update</button>
        </div>
    );
}

// {
//     (()=>{
//         switch(props.visibility){

//         }
//     })

// }
