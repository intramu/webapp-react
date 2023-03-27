/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { IDivision } from "../../../interfaces/competition/IDivision";
import {
    colors,
    definedSizes,
    flexCenterVertical,
    iconSizing,
} from "../../../styles/scss/player/common";
import { divisionContainer } from "../../../styles/scss/player/containers";
import BracketList from "../brackets/BracketList";

interface IDivisionBox {
    division: IDivision;
}

function DivisionBox({ division }: IDivisionBox) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => setIsOpen((x) => !x);

    return (
        <div css={[divisionContainer, { backgroundColor: isOpen ? "white" : colors.content }]}>
            <div css={[flexCenterVertical]}>
                <span css={{ flex: 1 }}>{division.type}</span>
                <button onClick={toggle}>
                    <img css={[iconSizing.md]} src="./logo192.png" alt="icon" />
                </button>
            </div>
            {isOpen && <BracketList brackets={division.brackets} />}
        </div>
    );
}

export default DivisionBox;
