import React from "react";
import { MenuItem } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import { MaterialSelectInput, MaterialTextInput } from "../../../common/inputs";
import { Sport } from "../../../utilities/enums/commonEnum";
import { LeagueModel } from "../../../models/contests/LeagueModel";
import { FormikDivision } from "./Division";
import { DivisionModel } from "../../../models/contests/DivisionModel";

interface props {
    formik(field: string, value: any, shouldValidate?: boolean | undefined): void;
    league: LeagueModel;
    lindex: number;
    removeLeague(index: number): void;
}

export function FormikLeague({ formik, league, lindex, removeLeague }: props) {
    return (
        <div>
            <span>League: {lindex + 1}</span>

            <MaterialTextInput name={`leagues.${lindex}.name`} label="Name" />
            <MaterialSelectInput name={`leagues.${lindex}.sport`} enumValue={Sport} label="Sport" />
            <button type="button" onClick={() => removeLeague(lindex)}>
                Remove
            </button>

            <FieldArray name={`leagues.${lindex}.divisions`}>
                {({ push, remove }) => (
                    <div style={{ marginLeft: 20 }}>
                        {league.divisions.map((divison, dindex) => (
                            <FormikDivision
                                formik={formik}
                                key={dindex}
                                division={divison}
                                dindex={dindex}
                                lindex={lindex}
                                removeDivision={remove}
                            />
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
            </FieldArray>
        </div>
    );
}
