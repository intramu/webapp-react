import React from "react";
import { MenuItem } from "@mui/material";
import { FieldArray } from "formik";
import { MaterialTextInput } from "../../../common/inputs";
import { Sport } from "../../../utilities/enums/commonEnum";
import { LeagueModel } from "../../../models/contests/LeagueModel";
import { FormikDivision } from "./Division";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { BracketModel } from "../../../models/contests/BracketModel";

interface props {
    bracket: BracketModel;
    lindex: number;
    dindex: number;
    bindex: number;
    removeBracket(index: number): void;
}

export function FormikBracket({ bindex, bracket, dindex, lindex, removeBracket }: props) {
    return (
        <div>
            <span>Bracket: {bindex + 1}</span>

            <MaterialTextInput
                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.name`}
                label="Name"
            />
            <MaterialTextInput name={`leagues.${lindex}.sport`} label="Sport">
                {(Object.keys(Sport) as Array<Sport>).map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </MaterialTextInput>
            <button type="button" onClick={() => removeBracket(lindex)}>
                Remove
            </button>

            {/* <FieldArray name={`leagues.${lindex}.divisions`}>
                {({ push, remove }) => (
                    <div style={{ marginLeft: 20 }}>
                        {bracket.timeChoices.map((br, dindex) => (
                            // <>
                            <FormikDivision
                                key={dindex}
                                division={divison}
                                dindex={dindex}
                                lindex={lindex}
                                removeDivision={remove}
                            />
                            // </>
                        ))}

                        <button
                            type="button"
                            onClick={() => {
                                push(new DivisionModel());
                            }}>
                            Push Division
                        </button>
                    </div>
                )}
            </FieldArray> */}
        </div>
    );
}
