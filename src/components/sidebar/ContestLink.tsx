import React from "react";
import { CSSObject } from "@emotion/react";
import { NavLink } from "react-router-dom";
import { ContestModel } from "../../models/contests/ContestModel";

interface ContestLinkProps {
    contest: ContestModel;
    overflowControl: CSSObject;
    styling: CSSObject[];
    setActive(x: string): void;
}

export function ContestLink({ contest, overflowControl, styling, setActive }: ContestLinkProps) {
    if (contest.name) {
        return (
            <NavLink
                css={[styling]}
                to={`/network/${contest.id}`}
                onClick={() => setActive("network")}>
                <span css={[overflowControl]}>{contest.name}</span>
            </NavLink>
        );
    }

    return (
        <NavLink css={styling} to={`/network/${contest.id}`} onClick={() => setActive("network")}>
            <span css={[overflowControl]}>{contest.season}</span>
            <span>T{contest.term}</span>
        </NavLink>
    );
}
