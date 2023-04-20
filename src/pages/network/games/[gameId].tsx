import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { fullDynamic } from "../../../styles/player/containers";
import { flexColumn, flexRow } from "../../../styles/player/common";

const apiKey = "AIzaSyBK_NiutcgZetnwf8vRt3W1ombP4UI5Glo";
export function ContestGame() {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
                Back
            </Button>
            <div css={fullDynamic}>
                <div css={[flexRow, { justifyContent: "space-between" }]}>
                    <div css={flexRow}>
                        <GroupsIcon />
                        <span>
                            <h6>Team One</h6>
                            <span>(4-0-0, Home)</span>
                        </span>
                    </div>
                    <div>VS</div>
                    <div css={flexRow}>
                        <GroupsIcon />
                        <span>
                            <h6>Team Two</h6>
                            <span>(3-1-0, Away)</span>
                        </span>
                    </div>
                </div>
                <div css={[flexColumn, { alignItems: "center", marginTop: 100 }]}>
                    <iframe
                        title="MapsVisual"
                        width="650"
                        height="350"
                        frameBorder="0"
                        style={{ border: 0 }}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=3300+West+Camelback+Road,+Phoenix+AZ,+USA`}
                        allowFullScreen
                    />
                </div>
            </div>
        </>
    );
}
