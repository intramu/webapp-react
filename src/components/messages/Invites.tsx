import React from "react";
import { observer } from "mobx-react-lite";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { CSSObject } from "@emotion/react";
import { userRootStore } from "../../pages/_routes";
import { flexColumn } from "../../styles/player/common";
import { GreyButton } from "../Buttons";
import { fullDynamic } from "../../styles/player/containers";

const messageSpacing: CSSObject = {
    "& >*": {
        marginRight: 10,
    },
};

export const Invites = observer(() => {
    const { inviteStore: store } = userRootStore;

    const { acceptInvite, declineInvite } = store;

    const decline = (teamId: number) => {
        // eslint-disable-next-line no-alert, no-restricted-globals
        const response = confirm("Are you sure you want to reject this invite?");
        if (response) {
            declineInvite(teamId);
        }
    };

    return (
        <div css={fullDynamic}>
            <h3>Invites</h3>
            <div css={[flexColumn, { borderTop: "2px solid grey" }]}>
                {store.invites.map((invite) => (
                    <span
                        css={[messageSpacing, { padding: "20px 0" }]}
                        key={invite.requestingTeamName}>
                        <AccountCircleOutlinedIcon />
                        <b>{invite.requestingPlayerFullName}</b> wants you to join their team,{" "}
                        <b>{invite.requestingTeamName}</b>
                        <GreyButton onClick={() => acceptInvite(invite.teamId)}>Accept</GreyButton>
                        <GreyButton onClick={() => decline(invite.teamId)}>Reject</GreyButton>
                    </span>
                ))}
                {store.invites.length === 0 && <span>No Requests</span>}
            </div>
            {store.state === "pending" && <span>Loading</span>}
            <GreyButton onClick={store.fetchInvites}>Refresh</GreyButton>
        </div>
    );
});
