import React, { useState } from "react";
import { CSSObject } from "@emotion/react";
import { NewBracketBuilder } from "../../components/admin/competitionCreator/NewBracketBuilder";

const toolTip: CSSObject = {
    position: "relative",
    display: "inline-block",
    "&:hover #toolTipText": {
        visibility: "visible",
    },
    paddingRight: "1vw",
    paddingLeft: "1vw",
};

const toolTipText: CSSObject = {
    visibility: "hidden",
    width: "20vw",
    backgroundColor: "black",
    color: "#fff",
    textAlign: "center",
    padding: "5px 0",
    borderRadius: "6px",

    /* Position the tooltip text - see examples below! */
    position: "absolute",
    top: "-5px",
    left: "105%",
    zIndex: 1,
};

export default function TempCompetitionCreator() {
    const [competition, setCompetition] = useState("");
    const [competitionType, setCompetitionType] = useState("");

    const handleCompetition = (e: any) => setCompetition(e.target.value);
    const handleCompetitionType = (e: any) => setCompetitionType(e.target.value);

    return (
        <div>
            <h1>Competition Creator</h1>
            <p>
                The competition creator will walk through a number inputs that will set up your
                event
            </p>
            <span>What is a competition?</span>
            <div css={toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" css={toolTipText}>
                    A competition is the main container for all sporting events that will occur in
                    your organization. You can host leagues and tournaments separately and even
                    change the visibility to make private events
                </span>
            </div>
            <hr />
            <p>Please fill in all fields</p>

            <br />

            <h3>What type of competition will this event be?</h3>
            <label htmlFor="tournament">Tournament: </label>
            <input
                type="radio"
                id="tournament"
                value="tournament"
                checked={competition === "tournament"}
                onChange={(e) => handleCompetition(e)}
            />
            <div css={toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" css={toolTipText}>
                    Traditional style tournament with full customization
                </span>
            </div>
            <br />
            <label htmlFor="league">League competition: </label>
            <input
                type="radio"
                id="league"
                value="league"
                checked={competition === "league"}
                onChange={(e) => handleCompetition(e)}
            />
            <div css={toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" css={toolTipText}>
                    Traditional league which follows a schedule
                </span>
            </div>
            <br />
            <br />
            {/* <BracketBuilder competitionType={competitionType} /> */}
            <NewBracketBuilder />
        </div>
    );
}
