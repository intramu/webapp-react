/* eslint-disable no-param-reassign */
/** @jsxImportSource @emotion/react */
import React from "react";
import { observer } from "mobx-react-lite";
import { MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import { LeagueModel } from "../../../models/contests/LeagueModel";
import { NewDivision } from "./Division";
import { MaterialDatePicker, MaterialTextInput } from "../../../common/inputs";

interface LeagueProps {
    league: LeagueModel;
    removeLeague(x: number): void;
    index: number;
}

interface SubmitProps {
    name: string;
    sport: string;
}

export const NewLeague = observer(({ league, removeLeague, index }: LeagueProps) => {
    const submittingContext = false;

    // const submit = ({ name, sport }: SubmitProps) => {
    //     league.name = name;
    //     league.sport = sport;
    // };

    return (
        <div css={{ border: "1px solid black" }}>
            <span>League: {index}</span>

            {/* <MaterialTextInput
                name="name"
                label="Optional: Name"
                variant="outlined"
                disabled={submittingContext}
            />
            <MaterialTextInput
                name="sport"
                label="Select Sport"
                variant="outlined"
                disabled={submittingContext}
                select>
                <MenuItem value="Soccer">Soccer</MenuItem>
                <MenuItem value="Basketball">Basketball</MenuItem>
            </MaterialTextInput> */}
            <input type="text" name="name" />
            <button onClick={() => removeLeague(index)}>Remove</button>
            <button onClick={league.pushDivision}>Add Division</button>

            <div>
                {league.divisions.map((division, dIndex) => (
                    <NewDivision
                        key={dIndex}
                        division={division}
                        index={dIndex}
                        removeDivision={league.removeDivision}
                    />
                ))}
            </div>
        </div>
    );
});