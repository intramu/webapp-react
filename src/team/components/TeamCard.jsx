import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import CheckPassword from "../../components/CheckPassword";
// import Popup from "../../components/Popup";
import PlayerRoster from "./PlayerRoster";

const useStyles = createUseStyles({
    container: {
        border: "1px solid red",
    },
});

export default function TeamCard({ team, ...props }) {
    const classes = useStyles();
    const [roster, setRoster] = useState([]);
    const [checkPassword, setCheckPassword] = useState(false);

    useEffect(() => {
        setRoster(
            team.roster.map((player, index) => {
                console.log(player);
                return (
                    <option key={index} value={player}>
                        {player.FIRST_NAME}
                    </option>
                );
            })
        );
    }, []);

    const confirmBox = () => {
        if (window.confirm("Are you sure you want to leave?")) props.leaveTeam(team.teamId);
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
