/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { IContest } from "../../interfaces/competition/IContest";

interface ContestLinkProps {
    contest: IContest;
    overflowControl: CSSObject;
    spacedLink: CSSObject;
}

export function ContestLink({ contest, overflowControl, spacedLink }: ContestLinkProps) {
    if (contest.name) {
        return (
            <NavLink css={[spacedLink]} to={`/network/${contest.id}`}>
                <span css={[overflowControl]}>{contest.name}</span>
            </NavLink>
        );
    }

    return (
        <NavLink css={[spacedLink]} to={`/network/${contest.id}`}>
            <span css={[overflowControl]}>{contest.season}</span>
            {/* <span css={[overflowControl]}>Hello this league is big wow it doesnt overflow</span> */}
            <span>T{contest.term}</span>
        </NavLink>
    );
}
