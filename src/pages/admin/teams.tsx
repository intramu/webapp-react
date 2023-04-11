import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { observer } from "mobx-react-lite";

export const Teams = observer(() => {
    // const [teams] = useState(() => new )
    return (
        <div>
            <h1>Teams</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
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
