/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { userRootStore } from "../../pages/_routes";
import { flexColumn } from "../../styles/player/common";
import { GreyButton } from "../Buttons";

export const Requests = observer(() => {
    const { inviteStore: store } = userRootStore;

    const { acceptInvite, declineInvite } = store;

    const decline = () => {
        // eslint-disable-next-line no-alert, no-restricted-globals
        const response = confirm("are you sure");
    };

    return (
        <>
            <div css={[flexColumn, { borderTop: "2px solid grey" }]}>
                {store.invites.map((invite) => (
                    <span css={{ padding: "20px 0" }} key={invite.requestingTeamName}>
                        <AccountCircleOutlinedIcon />
                        <b>{invite.requestingPlayerFullName}</b> wants you to join their team,{" "}
                        <b>{invite.requestingTeamName}</b>
                        <GreyButton onClick={() => acceptInvite(invite.teamId)}>Accept</GreyButton>
                        <GreyButton onClick={decline}>Reject (Doesnt work)</GreyButton>
                    </span>
                ))}
                {store.invites.length === 0 && <span>No Requests</span>}
            </div>
            {store.state === "pending" && <span>Loading</span>}
            <GreyButton onClick={store.fetchInvites}>Refresh</GreyButton>
        </>
    );
});
export default Requests;
