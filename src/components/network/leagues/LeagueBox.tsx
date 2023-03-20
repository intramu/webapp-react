/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { ILeague } from "../../../interfaces/competition/ILeague";
import { flexCenterVertical, smallIconSize } from "../../../styles/scss/player/common";
import { networkContainer } from "../../../styles/scss/player/containers";
import DivisionList from "../divisions/DivisionList";

function LeagueBox({ league }: { league: ILeague }) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    return (
        <div css={[networkContainer]}>
            <div css={[{ flexDirection: "row" }, flexCenterVertical]}>
                <div css={{ flex: 1 }}>
                    <span>{league.sport}</span>
                    <span>OPEN</span>
                    <span>
                        Registration: <span>FEB 13 - MAR 22</span>
                    </span>
                </div>
                <span>
                    Season: March 27 - April 06
                    <button onClick={() => setIsOpen((x) => !x)}>
                        <img css={[smallIconSize.md]} src="./logo192.png" alt="Icon" />
                    </button>
                </span>
            </div>
            {isOpen && <DivisionList divisions={league.divisions} />}
        </div>
    );
}

export default LeagueBox;
