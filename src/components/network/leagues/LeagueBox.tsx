/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";

import { ILeague } from "../../../interfaces/competition/ILeague";
import DivisionList from "../divisions/DivisionList";
import { sizes } from "../../../styles/scss/player/commonStyles";

const test = css({
    backgroundColor: "white",
    width: sizes.containerWidth,
    position: "relative",
    borderRadius: sizes.containerRadius,
    margin: "1em",
    padding: "1em",
});

function LeagueBox({ league }: { league: ILeague }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div css={test}>
            <span css={{ fontWeight: "bold" }}>{league.sport}</span> |{" "}
            <span css={{ color: "blue" }}>OPEN</span> | <span>Registration: FEB 13 - MAR 22</span>
            <span
                css={{
                    float: "right",
                }}>
                <span>{`Registration ${league.startDate} - ${league.endDate}`}</span>
                <button onClick={() => setIsOpen((x) => !x)}>Toggle</button>
            </span>
            {isOpen && <DivisionList divisions={league.divisions} />}
        </div>
    );
}

export default LeagueBox;
