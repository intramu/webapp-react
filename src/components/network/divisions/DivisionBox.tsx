/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { IDivision } from "../../../interfaces/competition/IDivision";
import { sizes } from "../../../styles/scss/player/commonStyles";
import { BracketBox } from "../brackets/BracketBox";

interface IDivisionBox {
    division: IDivision;
}

const test = {
    container: css({
        width: sizes.containerWidth,
        position: "relative",
        borderRadius: sizes.containerRadius,
        margin: "1em",
        padding: "1em",
    }),
    button: css({
        float: "right",
    }),
};

function DivisionBox({ division }: IDivisionBox) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div css={test.container} style={{ backgroundColor: isOpen ? "white" : "grey" }}>
            <span>
                {division.type} {division.level}
            </span>
            <button css={test.button} onClick={() => setIsOpen((x) => !x)}>
                Toggle
            </button>
            {isOpen &&
                division.brackets.map((bracket, index) => (
                    <BracketBox key={index} bracket={bracket} maxTeamSize={division.maxTeamSize} />
                ))}
        </div>
    );
}

export default DivisionBox;
