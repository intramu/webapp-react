import { createUseStyles } from "react-jss";
import React, { useState } from "react";
import BracketBuilder from "./BracketBuilder";

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

export default function CompetitionCreator() {
    const classes = useStyles();
    const [competitionType, setCompetitionType] = useState("intramuralLeague");

    // ! REVISIT - any event handlers can be typed better
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (e: any) => setCompetitionType(e.target.value);

    return (
        <main id="adminMain">
            <h1>Competition Creator</h1>
            <p>
                The competition creator will walk through a number inputs that will set up your
                event
            </p>
            <p>Please fill in all fields</p>

            <h3>What will be the name of the this glorious competition?</h3>
            <span>What is a competition?</span>
            <div className={classes.toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" className={classes.toolTipText}>
                    A competition is the main container for all sporting events that will occur in
                    your organization. You will more than likely only ever need one of these for
                    intramural sports. This supports the option to host separate tournaments outside
                    of the intramural sports network and for private competitions.
                </span>
            </div>
            <br />
            <input type="text" name="competitionName" placeholder="GCU-intramural-league" />
            <br />
            <h3>What type of competition will this event be?</h3>
            <label htmlFor="tournament">Tournament: </label>
            <input
                type="radio"
                id="tournament"
                value="tournament"
                checked={competitionType === "tournament"}
                onChange={handleInputChange}
            />
            <div className={classes.toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" className={classes.toolTipText}>
                    Will be a traditional style tournament with random or selected seeding.
                </span>
            </div>
            <br />
            <label htmlFor="league">League competition: </label>
            <input
                type="radio"
                id="league"
                value="league"
                checked={competitionType === "league"}
                onChange={handleInputChange}
            />
            <div className={classes.toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" className={classes.toolTipText}>
                    Normal league competition with games in varying durations for a selected time
                    duration. There is no playoffs at the end of this competition.
                </span>
            </div>
            <br />
            <label htmlFor="intraLeague">Intramural competition: </label>
            <input
                type="radio"
                id="intraLeague"
                value="intramuralLeague"
                checked={competitionType === "intramuralLeague"}
                onChange={handleInputChange}
            />
            <div className={classes.toolTip} id="tooltip">
                <img src="/informationIcon.png" alt="Info" />
                <span id="toolTipText" className={classes.toolTipText}>
                    This will be the most likely choice for all users. This supports league play
                    with a playoff/ tournament at the end.
                </span>
            </div>
            <br />
            <BracketBuilder competitionType={competitionType} />
        </main>
    );
}
