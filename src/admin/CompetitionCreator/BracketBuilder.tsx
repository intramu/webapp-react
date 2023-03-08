/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useAuth0 } from "@auth0/auth0-react";
import Bracket from "./Bracket";
import Division from "./Division";
import { LeagueModel } from "../models/League";
import League from "./League";
import { apiCreateCompetition } from "../../common/api";
import useApi from "../../common/hooks/useSWR";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BracketBuilder(props: any) {
    // const createCompetitionApi = useApi(apiCreateCompetition);
    const classes = useStyles();

    const { user, getAccessTokenSilently } = useAuth0();
    const [newList, setNewList] = useState({
        competitionName: "",
        competitionVisibility: "",
        competitionStatus: "",
        competitionSport: "",
        competitionType: "",
        leagueTournamentType: "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        leagues: [] as any[],
    });

    useEffect(() => {
        setNewList({
            ...newList,
            competitionType: props.competitionType,
        });
        // ! REVISIT - this error might be right
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.competitionType]);

    const handleSubmit = async () => {
        const token = await getAccessTokenSilently();
        if (!user) {
            throw new Error("User not defined");
        }
        // createCompetitionApi.request(token, user.sub, newList);
        console.log("here");
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
                }}>
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
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {league.divisions.map((division: any, divisionIndex: number) => (
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
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {division.brackets.map((bracket: any, bracketIndex: number) => (
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

            <button onClick={handleSubmit}>Create</button>
            {/* {createCompetitionApi.error ? createCompetitionApi.error : null} */}
        </>
    );
}

export default BracketBuilder;
