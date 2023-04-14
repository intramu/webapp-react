/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TeamRow from "../teams/TeamRow";
import { BracketModel } from "../../../models/contests/BracketModel";
import {
    colors,
    flexCenterVertical,
    flexColumn,
    standardFontSizes,
} from "../../../styles/player/common";
import { unstyledButton } from "../../../styles/player/buttons";

interface IBracketBox {
    bracket: BracketModel;
}

function BracketBox({ bracket }: IBracketBox) {
    const createTeam = () => {
        // create team in bracket waitlist
    };

    const teams = [
        {
            id: 18,
            name: "Affordable Christians",
            wins: 0,
            ties: 0,
            losses: 0,
            image: "",
            gender: "MENS",
            dateCreated: "2023-04-08T18:57:55.102Z",
            visibility: "PRIVATE",
            sportsmanshipScore: "4",
            status: "UNELIGIBLE",
            maxTeamSize: 12,
            players: [],
        },
        {
            id: 19,
            name: "Jungle Giants",
            wins: 0,
            ties: 0,
            losses: 0,
            image: "",
            gender: "MENS",
            dateCreated: "2023-04-08T18:57:55.102Z",
            visibility: "PRIVATE",
            sportsmanshipScore: "4",
            status: "UNELIGIBLE",
            maxTeamSize: 12,
            players: [],
        },
    ];

    return (
        <div css={{ marginBottom: 30 }}>
            {bracket.maxTeamAmount === 0 ? (
                <div
                    css={{
                        fontSize: standardFontSizes.md,
                        color: colors.footer,
                        fontWeight: "500",
                        margin: "10px 0px",
                    }}>
                    Waitlist
                </div>
            ) : (
                <div
                    css={{
                        fontSize: standardFontSizes.md,
                        color: colors.footer,
                        fontWeight: "500",
                        margin: "10px 0px",
                    }}>
                    <span css={{ marginRight: 50 }}>Monday - Wednesday - Friday</span>
                    <span>5:00 PM - 5:45 PM - 6:30 PM</span>
                </div>
            )}
            {/* teams */}
            <div css={[flexColumn, { borderTop: "2px solid grey" }]}>
                {bracket.maxTeamAmount === 0 ? (
                    teams.map((team, index) => (
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
                            ]}
                            key={index}>
                            <div css={{ height: 2, backgroundColor: colors.primary, width: 70 }} />
                            <AccountCircleOutlinedIcon css={{ margin: "0 13px" }} />
                            <span css={{ width: 180 }}>{team.name}</span>
                            <button
                                css={[unstyledButton, { color: colors.primary, margin: "0 40px" }]}>
                                Join
                            </button>
                            <span>Players: N/A</span>
                        </div>
                    ))
                ) : (
                    <div
                        css={[
                            flexCenterVertical,
                            {
                                backgroundColor: colors.content,
                                padding: "20px 0px",
                            },
                        ]}>
                        No teams yet. Be the first to join!
                    </div>
                )}
            </div>
        </div>
    );
    // function showTimes() {
    //     let time = "";
    //     bracket.timeChoices.forEach((choice) => {
    //         time += `, ${choice.startTime}`;
    //     });

    //     return time;
    // }

    // if (bracket.maxTeamAmount > 0) {
    //     return (
    //         <div>
    //             <b>{bracket.dayChoices}</b>
    //             <b>{showTimes()}</b>

    //             {bracket.teams.length === 0 ? (
    //                 <div>No Teams</div>
    //             ) : (
    //                 <div>
    //                     {bracket.teams.map((team, index) => (
    //                         <TeamRow key={index} team={team} />
    //                     ))}
    //                 </div>
    //             )}
    //         </div>
    //     );
    // }

    // return (
    //     <div>
    //         <b>Waitlist</b>

    //         {/* render team cards here */}
    //         {bracket.teams.length === 0 ? (
    //             <div>No Teams</div>
    //         ) : (
    //             <div>
    //                 {bracket.teams.map((team, index) => (
    //                     <TeamRow key={index} team={team} />
    //                 ))}
    //             </div>
    //         )}
    //         <button onClick={() => createTeam()}>Create Team</button>
    //     </div>
    // );
}

export default BracketBox;
