/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { observer } from "mobx-react-lite";
import GroupsIcon from "@mui/icons-material/Groups";
import { organizationStore } from "../_routes";
import { GreyButton } from "../../components/Buttons";

export const Teams = observer(() => {
    const { teamStore } = organizationStore;

    const fetchTeams = () => {
        teamStore.fetchAllTeams();
    };

    useEffect(() => {
        if (teamStore.teams.length === 0) {
            fetchTeams();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamStore]);

    return (
        <div>
            <h1>Teams</h1>
            <GreyButton onClick={fetchTeams}>Refresh</GreyButton>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Visibility</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell size="small" />
                            <TableCell />
                            <TableCell />
                            <TableCell>Id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamStore.teams.length === 0 ? (
                            <TableRow>
                                <TableCell>No Teams</TableCell>
                            </TableRow>
                        ) : (
                            teamStore.teams.map((team) => (
                                <TableRow hover key={team.id}>
                                    <TableCell>
                                        {team.image || <GroupsIcon css={{ fontSize: 40 }} />}
                                    </TableCell>
                                    <TableCell>{team.name}</TableCell>
                                    <TableCell>{team.visibility}</TableCell>
                                    <TableCell>{team.status}</TableCell>
                                    <TableCell>{team.dateCreated}</TableCell>
                                    <TableCell size="small">
                                        <GreyButton>Message</GreyButton>
                                    </TableCell>
                                    <TableCell>
                                        <GreyButton>Ban</GreyButton>
                                    </TableCell>
                                    <TableCell>
                                        <GreyButton>View</GreyButton>
                                    </TableCell>
                                    <TableCell>{team.id}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
});
