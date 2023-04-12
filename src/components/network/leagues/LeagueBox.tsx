/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CSSObject } from "@emotion/react";

import { ILeague } from "../../../interfaces/competition/ILeague";
import { flexCenterVertical, iconSizing } from "../../../styles/scss/player/common";
import { networkContainer } from "../../../styles/scss/player/containers";
import DivisionList from "../divisions/DivisionList";

const icon: CSSObject = {
    fontSize: 30,
};

function LeagueBox({ league }: { league: ILeague }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => setIsOpen((x) => !x);

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
                    <button onClick={toggle} css={{ all: "unset" }}>
                        {isOpen ? (
                            <KeyboardArrowDownIcon css={icon} />
                        ) : (
                            <KeyboardArrowLeftIcon css={icon} />
                        )}
                    </button>
                </span>
            </div>
            {isOpen && <DivisionList divisions={league.divisions} />}
        </div>
    );
}

export default LeagueBox;
