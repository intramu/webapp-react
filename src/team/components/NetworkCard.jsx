import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import PlayerRoster from "./PlayerRoster";

const useStyles = createUseStyles({
    container: {
        border: "1px solid red",
    },
});

export default function NetworkCard(props) {
    const classes = useStyles();
    const [roster, setRoster] = useState([]);
    const [userStatus, setUserStatus] = useState(false);

    useEffect(() => {
        setRoster(
            props.roster.map((element, index) => {
                console.log(element);
                isUserOnTeam(element.AUTH_ID);
                return (
                    <option key={index} value={element}>
                        {element.FIRST_NAME}
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
            <span>{userStatus ? "My Team" : ""}</span>
            {/* Belong in a different type of card for a team view rather than a network view *
            <span>Invite Members</span>
            <span>Schedule</span>
            <span>Settings</span> */}

            {/** When a team posesses a visibility value of open the button is
             * displayed. When this button is pressed it passes the id value
             * back up to the parent function
             */}
            <span>{props.visibility}</span>
            {props.visibility === "OPEN" && !userStatus && (
                <button onClick={() => props.joinTeam(props.id)}>Join</button>
            )}
            {props.visibility === "PRIVATE" && !userStatus && (
                <button onClick={() => props.requestToJoinTeam(props.id)}>
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
