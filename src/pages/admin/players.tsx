import React, { useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { observer } from "mobx-react-lite";
import { organizationStore } from "../_routes";
import { GreyButton } from "../../components/Buttons";

/** Will show all players in organization in table view */
export const Players = observer(() => {
    const { playerStore } = organizationStore;

    // fetches all players from database
    const fetchPlayers = () => {
        playerStore.fetchAllPlayers();
    };

    // calls fetch on render
    useEffect(() => {
        fetchPlayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerStore]);

    return (
        <div>
            <h1>Players</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email Address</TableCell>
                            <TableCell>Visibility</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell size="small" />
                            <TableCell />
                            <TableCell />
                            <TableCell>Auth Id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playerStore.players.length === 0 ? (
                            <TableRow>
                                <TableCell>No Teams</TableCell>
                            </TableRow>
                        ) : (
                            playerStore.players.map((player) => (
                                <TableRow hover key={player.authId}>
                                    <TableCell>
                                        {player.image || <GroupsIcon css={{ fontSize: 40 }} />}
                                    </TableCell>
                                    <TableCell>
                                        {`${player.firstName} ${player.lastName}`}{" "}
                                    </TableCell>
                                    <TableCell>{player.emailAddress}</TableCell>
                                    <TableCell>{player.visibility}</TableCell>
                                    <TableCell>{player.status}</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell size="small">
                                        <GreyButton>Message</GreyButton>
                                    </TableCell>
                                    <TableCell>
                                        <GreyButton>Ban</GreyButton>
                                    </TableCell>
                                    <TableCell>
                                        <GreyButton>View</GreyButton>
                                    </TableCell>
                                    <TableCell>{player.authId}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
});
