import React, { useEffect } from "react";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import Bracket from "./Bracket";
import Division from "./Division";
import { LeagueModel } from "../models/League.ts";
import League from "./League";
import useApi from "../../common/useApi";
import { apiCreateCompetition } from "../../common/api";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = createUseStyles({
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

const BracketBuilder = (props) => {
    const postCompetitionApi = useApi(apiCreateCompetition);
    const classes = useStyles();

    const { user, getAccessTokenSilently } = useAuth0();
    const [newList, setNewList] = useState({
        competitionType: "",
        leagues: [],
    });

    useEffect(() => {
        setNewList({
            ...newList,
            competitionType: props.competitionType,
        });
    }, [props.competitionType]);

    const handleSubmit = async () => {
        let token = await getAccessTokenSilently();
        postCompetitionApi.request(token, user.sub, newList);
    };

    const createLeague = () => {
        setNewList({
            ...newList,
            leagues: [new LeagueModel()],
        });
    };

    return (
        <>
            <button
                onClick={() => {
                    console.log(newList);
                }}
            >
                Look
            </button>
            <button onClick={createLeague}>Add League</button>

            {newList.leagues.map((league, leagueIndex) => (
                <div key={leagueIndex}>
                    <League
                        className={classes.leagueBox}
                        leagueIndex={leagueIndex}
                        newList={newList}
                        setNewList={setNewList}
                        league={league}
                    />
                    {league.divisions.map((division, divisionIndex) => (
                        <div key={divisionIndex}>
                            <Division
                                className={classes.divisionBox}
                                division={division}
                                leagueIndex={leagueIndex}
                                divisionIndex={divisionIndex}
                                newList={newList}
                                setNewList={setNewList}
                                datesDisabled={league.leagueSetsDates}
                            />
                            {division.brackets.map((bracket, bracketIndex) => (
                                <Bracket
                                    key={bracketIndex}
                                    className={classes.bracketBox}
                                    bracket={bracket}
                                    bracketIndex={bracketIndex}
                                    divisionIndex={divisionIndex}
                                    leagueIndex={leagueIndex}
                                    newList={newList}
                                    setNewList={setNewList}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            ))}

            <button onClick={() => handleSubmit}>Create</button>
        </>
    );
};

export default BracketBuilder;
