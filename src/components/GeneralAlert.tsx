/** @jsxImportSource @emotion/react */
import React from "react";
import { observer } from "mobx-react-lite";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { uiStore } from "../pages/_routes";

export const GeneralAlert = observer(() => {
    const { dismissAlert, message, alertType } = uiStore;

    if (!message) {
        return null;
    }

    return (
        <Alert
            css={{ position: "absolute", bottom: "5%", left: "0", width: "100%" }}
            action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={dismissAlert}>
                    <CloseIcon />
                </IconButton>
            }
            severity={alertType}>
            {message}
        </Alert>
    );
});
