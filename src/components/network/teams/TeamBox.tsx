import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { CSSObject } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import useAxios from "../../../common/hooks/useAxios";
import { TeamModel } from "../../../models/team/TeamModel";
import { colors, flexCenterVertical } from "../../../styles/player/common";
import { unstyledButton } from "../../../styles/player/buttons";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { TeamVisibility } from "../../../utilities/enums/teamEnum";

interface RowProps {
    team: TeamModel | null;
    index: number;
    division: DivisionModel;
}

const commonMargin: CSSObject = {
    margin: "0 13px",
};

const blueLine: CSSObject = {
    height: 2,
    backgroundColor: colors.primary,
    width: 70,
};

export const TeamBox = observer(({ team, index, division }: RowProps) => {
    const { user } = useAuth0();

    const [testTeam] = useState(() => new TeamModel());
    const navigate = useNavigate();

    if (!team) {
        return (
            <div
                css={[
                    flexCenterVertical,
                    {
                        backgroundColor: colors.content,
                        padding: "20px 0",
                    },
                ]}>
                <div css={blueLine} />
                <span css={commonMargin}>
                    No teams yet. Be the first to join! Create a team below.
                </span>
            </div>
        );
    }

    useEffect(() => {
        testTeam.fetchTeamById(team?.id);
    });
    // const { joinTeam } = team;

    const teamJoin = () => {
        testTeam.joinTeam();

        // if (!team.error) {
        //     // if success send to team page
        //     navigate(`/team/${team.id}`);
        // }
    };

    return (
        <div
            css={[
                flexCenterVertical,
                {
                    backgroundColor: index % 2 ? colors.background : colors.content,
                    padding: "20px 0",
                    // "&:hover": {
                    "&:before": {
                        content: '""',
                        backgroundColor: "#000000",
                    },
                    // },
                },
            ]}>
            <div css={blueLine} />
            <AccountCircleOutlinedIcon css={commonMargin} />
            <span css={{ width: 180 }}>{team.name}</span>

            {!team.players.some((player) => player.authId === user?.sub) && (
                <button
                    onClick={teamJoin}
                    css={[unstyledButton, { color: colors.primary, margin: "0 40px" }]}>
                    {team.visibility === TeamVisibility.PRIVATE ? "Request" : "Join"}
                </button>
            )}
            <span>
                <span css={{ color: colors.footer }}>Players: </span> {team.players.length}/
                {division.maxTeamSize}
            </span>
        </div>
    );
});
