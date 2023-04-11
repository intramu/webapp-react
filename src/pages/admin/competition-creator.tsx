import { createUseStyles } from "react-jss";
import React, { useState } from "react";
// import BracketBuilder from "../../admin/CompetitionCreator/BracketBuilder";
import { NewBracketBuilder } from "../../components/admin/competitionCreator/NewBracketBuilder";

const useStyles = createUseStyles({
    toolTip: {
        position: "relative",
        display: "inline-block",
        "&:hover #toolTipText": {
            visibility: "visible",
        },
        paddingRight: "1vw",
        paddingLeft: "1vw",
    },

    toolTipText: {
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
    },

    leagueBox: {
        border: "1px solid black",
        margin: "5px 0 5px 0",
    },
    divisionBox: {
        border: "1px solid black",
        margin: "5px 0 5px 30px",
    },
    bracketBox: {
        border: "1px solid black",
        margin: "5px 0 5px 60px",
    },
});

export default function TempCompetitionCreator() {
    const classes = useStyles();
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
            <div className={classes.toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" className={classes.toolTipText}>
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
            <div className={classes.toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" className={classes.toolTipText}>
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
            <div className={classes.toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" className={classes.toolTipText}>
                    Traditional league which follows a schedule
                </span>
            </div>
            <br />
            {/* <BracketBuilder competitionType={competitionType} /> */}
            <br />
            <br />
            <br />
            <NewBracketBuilder />
        </div>
    );
}
