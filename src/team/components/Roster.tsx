/* eslint-disable react/destructuring-assignment */
import React, { FC } from "react";
import { createUseStyles } from "react-jss";
import { Table } from "reactstrap";
import { PlayerTeam } from "../../interfaces/Player";

const useStyles = createUseStyles({
    container: {
        border: "1px solid red",
        display: "flex",
        flexDirection: "row",
    },
});

export interface RosterProps {
    players: PlayerTeam[];
}

function Roster(props: RosterProps) {
    const { players } = props;
    const classes = useStyles();

    const findPlayer = (id: string) => {
        // make api call to load player and probably navigate to new window
        // showing player window
    };

    // make into clean looking table
    return (
        <Table className={classes.container}>
            <thead>
                <tr>
                    <th> </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player, index) => (
                    <tr key={index}>
                        <td>
                            <img src={player.image} alt="Profile" />
                        </td>
                        <td>{player.firstName}</td>
                        <td>{player.lastName}</td>
                        <td>{player.gender}</td>
                        <td>{player.role}</td>
                        <td>{player.status}</td>
                        <td>
                            <button onClick={() => findPlayer(player.authId)}>View</button>
                        </td>
                        <td>
                            <button onClick={() => findPlayer(player.authId)}>Kick</button>
                        </td>
                        <td>
                            <button onClick={() => findPlayer(player.authId)}>Promote</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default Roster;
