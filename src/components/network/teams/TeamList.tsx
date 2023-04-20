import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { flexColumn } from "../../../styles/player/common";
import { TeamModel } from "../../../models/team/TeamModel";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { TeamBox } from "./TeamBox";

interface ListProps {
    teams: TeamModel[];
    division: DivisionModel;
    isWaitlist: boolean;
}

export function TeamList({ teams, division, isWaitlist }: ListProps) {
    const navigate = useNavigate();

    return (
        <div css={[flexColumn, { borderTop: "2px solid grey" }]}>
            {teams.length > 0 ? (
                teams.map((team, index) => (
                    <TeamBox key={team.id} team={team} index={index} division={division} />
                ))
            ) : (
                <TeamBox key={1} team={null} index={1} division={division} />
            )}
            {isWaitlist && <Button onClick={() => navigate("/teams/new")}>New Team</Button>}
        </div>
    );
}
