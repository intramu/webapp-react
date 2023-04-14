/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Collapse } from "@mui/material";
import { CSSObject } from "@emotion/react";
import {
    colors,
    flexCenterVertical,
    flexRow,
    standardFontSizes,
} from "../../../styles/player/common";
import { networkContainer } from "../../../styles/player/containers";
import DivisionList from "../divisions/DivisionList";
import { LeagueModel } from "../../../models/contests/LeagueModel";
import { unstyledButton } from "../../../styles/player/buttons";

const icon: CSSObject = {
    fontSize: 30,
};

const paddedHeader: CSSObject = {
    borderRight: "1px solid black",
    paddingRight: 17,
    marginRight: 17,
    lineHeight: 0.7,
};

function LeagueBox({ league }: { league: LeagueModel }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => setIsOpen((x) => !x);

    // TODO: fix this paddedHeader junk. Its not all even because of the line-height
    return (
        <div css={networkContainer}>
            <div css={[{ flexDirection: "row" }, flexCenterVertical]}>
                <div css={[flexCenterVertical, { flex: 1, flexDirection: "row" }]}>
                    <span
                        css={[
                            paddedHeader,
                            {
                                fontSize: standardFontSizes.lg,
                                fontWeight: "600",
                            },
                        ]}>
                        Soccer
                    </span>
                    <span css={[paddedHeader, { color: colors.primary, lineHeight: 0.8 }]}>
                        OPEN
                    </span>
                    <span>
                        <span css={{ fontSize: standardFontSizes.md, marginRight: 2 }}>
                            Registration:{" "}
                        </span>
                        <span css={{ color: colors.primary }}>FEB 13 - MAR 22</span>
                    </span>
                </div>
                <div>
                    <span css={{ fontSize: standardFontSizes.md, marginRight: 5 }}>
                        Season: March 27 - April 06
                    </span>
                    <button onClick={toggle} css={unstyledButton}>
                        <KeyboardArrowLeftIcon
                            css={[
                                icon,
                                {
                                    transform: isOpen ? "rotate(-90deg)" : "initial",
                                    transition: "200ms",
                                },
                            ]}
                        />
                    </button>
                </div>
            </div>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <DivisionList divisions={league.divisions} />
            </Collapse>
        </div>
    );
}

export default LeagueBox;
