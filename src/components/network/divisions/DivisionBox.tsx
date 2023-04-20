/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Collapse } from "@mui/material";
import { CSSObject } from "@emotion/react";
import { flexCenterVertical } from "../../../styles/player/common";
import { bracketContainer, divisionContainer } from "../../../styles/player/containers";
import BracketList from "../brackets/BracketList";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { unstyledButton } from "../../../styles/player/buttons";

interface IDivisionBox {
    division: DivisionModel;
}

const icon: CSSObject = {
    fontSize: 30,
};

function DivisionBox({ division }: IDivisionBox) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => setIsOpen((x) => !x);

    return (
        <div css={[isOpen ? bracketContainer : divisionContainer]}>
            <div css={[flexCenterVertical]}>
                <span css={{ flex: 1, fontWeight: "500" }}>{division.type}</span>
                <button onClick={toggle} css={unstyledButton}>
                    <KeyboardArrowLeftIcon
                        css={[
                            icon,
                            {
                                transform: isOpen ? "rotate(270deg)" : "initial",
                                transition: "200ms",
                            },
                        ]}
                    />
                </button>
            </div>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <BracketList brackets={division.brackets} division={division} />
            </Collapse>
        </div>
    );
}

export default DivisionBox;
