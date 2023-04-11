import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { observer } from "mobx-react-lite";
import { PlayerModel } from "../../models/PlayerModel";

export const Players = observer(() => {
    const [players] = useState(() => [new PlayerModel()]);

    return (
        <div>
            <h1>Teams</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Auth Id</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email Address</TableCell>
                            <TableCell>Visibility</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {}
                        <TableRow>
                            <TableCell>{}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
});
