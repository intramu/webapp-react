/** @jsxImportSource @emotion/react */
import React, { createRef } from "react";
import { FieldArray } from "formik";
import { Grid } from "@mui/material";
import { MaterialSelectInput, MaterialTextInput } from "../../../common/inputs";
import { Sport } from "../../../utilities/enums/commonEnum";
import { LeagueModel } from "../../../models/contests/LeagueModel";
import { FormikDivision } from "./Division";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { flexColumn } from "../../../styles/player/common";
import { GreyButton } from "../../Buttons";
import { GridBreak } from "../competitionCreator/NewBracketBuilder";
import { newCommonContainer } from "../../../styles/player/containers";

interface props {
    formik(field: string, value: any, shouldValidate?: boolean | undefined): void;
    league: LeagueModel;
    lindex: number;
    removeLeague(index: number): void;
}

export function FormikLeague({ formik, league, lindex, removeLeague }: props) {
    const removeRef = createRef<HTMLButtonElement>();
    return (
        <div css={[flexColumn, newCommonContainer, { margin: "25px 0px 0px 25px" }]}>
            <h5>League: {lindex + 1}</h5>

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <MaterialTextInput name={`leagues.${lindex}.name`} label="Optional: Name" />
                </Grid>
                <Grid item xs={3}>
                    <MaterialSelectInput
                        name={`leagues.${lindex}.sport`}
                        enumValue={Sport}
                        label="Sport"
                    />
                </Grid>
                <GridBreak />
                <Grid item xs={6}>
                    <GreyButton type="button" onClick={() => removeLeague(lindex)}>
                        Pop League
                    </GreyButton>
                    <GreyButton type="button" onClick={() => removeRef.current?.click()}>
                        Push Division
                    </GreyButton>
                </Grid>
            </Grid>

            <FieldArray name={`leagues.${lindex}.divisions`}>
                {({ push, remove }) => (
                    <>
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
                            css={{ display: "none" }}
                            onClick={() => push(new DivisionModel())}
                            ref={removeRef}>
                            push
                        </button>
                    </>
                )}
            </FieldArray>
        </div>
    );
}
