import React from "react";
import { CSSObject } from "@emotion/react";
import { BracketModel } from "../../../models/contests/BracketModel";
import { colors, standardFontSizes } from "../../../styles/player/common";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { TeamList } from "../teams/TeamList";

interface IBracketBox {
    bracket: BracketModel;
    division: DivisionModel;
}

const bracketHeader: CSSObject = {
    fontSize: standardFontSizes.md,
    color: colors.footer,
    fontWeight: "500",
    margin: "10px 0px",
};

export function BracketBox({ bracket, division }: IBracketBox) {
    if (bracket.maxTeamAmount === 0) {
        return (
            <div css={{ marginBottom: 30 }}>
                <p css={bracketHeader}>Waitlist</p>
                <TeamList division={division} teams={bracket.teams} isWaitlist />
            </div>
        );
    }
    return (
        <div css={{ marginBottom: 30 }}>
            <p css={bracketHeader}>
                <span css={{ marginRight: 50 }}>Monday - Wednesday - Friday</span>
                <span>5:00 PM - 5:45 PM - 6:30 PM</span>
            </p>

            <TeamList division={division} teams={bracket.teams} isWaitlist={false} />
        </div>
    );
}
