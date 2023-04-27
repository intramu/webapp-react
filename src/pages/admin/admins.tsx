import React, { useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { observer } from "mobx-react-lite";
import { organizationStore } from "../_routes";
import { GreyButton } from "../../components/Buttons";

/** Will show all admins in organization in table view */
export const Admins = observer(() => {
    const { adminStore } = organizationStore;

    // fetches all players from database
    const fetchAdmins = () => {
        adminStore.fetchAllAdmins();
    };

    // calls fetch on render
    useEffect(() => {
        fetchAdmins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adminStore]);

    return (
        <div>
            <h1>Admins</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email Address</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell size="small" />
                            <TableCell />
                            <TableCell />
                            <TableCell>Auth Id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminStore.admins.length === 0 ? (
                            <TableRow>
                                <TableCell>No Teams</TableCell>
                            </TableRow>
                        ) : (
                            adminStore.admins.map((admin) => (
                                <TableRow hover key={admin.authId}>
                                    <TableCell>
                                        <GroupsIcon css={{ fontSize: 40 }} />
                                    </TableCell>
                                    <TableCell>{`${admin.firstName} ${admin.lastName}`}</TableCell>
                                    <TableCell>{admin.emailAddress}</TableCell>
                                    <TableCell>{admin.role}</TableCell>
                                    <TableCell>{admin.status}</TableCell>
                                    <TableCell>{admin.dateCreated}</TableCell>
                                    <TableCell size="small">
                                        <GreyButton>Message</GreyButton>
                                    </TableCell>
                                    <TableCell>
                                        <GreyButton>Disable</GreyButton>
                                    </TableCell>
                                    <TableCell>
                                        <GreyButton>View</GreyButton>
                                    </TableCell>
                                    <TableCell>{admin.authId}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
});
