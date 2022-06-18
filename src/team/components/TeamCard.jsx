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

export default function TeamCard(props) {
    const classes = useStyles();
    const [roster, setRoster] = useState([]);
    const [checkPassword, setCheckPassword] = useState(false);

    useEffect(() => {
        setRoster(
            props.roster.map((element, index) => {
                console.log(element);
                return (
                    <option key={index} value={element}>
                        {element.FIRST_NAME}
                    </option>
                );
            })
        );
    }, []);

    const confirmBox = () => {
        if (window.confirm("Are you sure you want to leave?"))
            props.leaveTeam(props.teamId);
    };

    return (
        <div className={classes.container} onClick={() => console.log("click")}>
            <h3>{props.sport}</h3>
            <h1>{props.name}</h1>
            <p>
                Record- W: {props.wins} | T: {props.ties} | L: {props.losses}
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
                teamId={props.teamId}
            />

            <button onClick={() => props.updateTeam(props.teamId)}>
                Update
            </button>
        </div>
    );
}

// {
//     (()=>{
//         switch(props.visibility){

//         }
//     })

// }
