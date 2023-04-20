import React from "react";
import { observer } from "mobx-react-lite";
import { CSSObject } from "@emotion/react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Button } from "@mui/material";
import { half } from "../../styles/player/containers";
import { TeamRequestStore } from "../../models/stores/TeamRequestStore";

interface props {
    requestStore: TeamRequestStore;
}

const messageSpacing: CSSObject = {
    "& >*": {
        marginRight: 10,
    },
};

export const TeamRequests = observer(({ requestStore }: props) => {
    return (
        <div css={half}>
            <h3>Requests</h3>
            {requestStore.requests.length > 0
                ? requestStore.requests.map((request, index) => (
                      <span css={messageSpacing} key={index}>
                          <AccountCircleOutlinedIcon />
                          <b>{request.requestingPlayerFullName}</b>wants to join your team
                          <Button
                              onClick={() =>
                                  requestStore.acceptRequest(request.teamId, request.authId)
                              }>
                              Accept
                          </Button>
                          <Button>Decline</Button>
                      </span>
                  ))
                : "No requests"}
        </div>
    );
});
