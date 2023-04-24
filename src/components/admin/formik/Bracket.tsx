import React from "react";
import { Grid } from "@mui/material";
import { Field } from "formik";
import { MaterialNumberInput, MaterialTextInput } from "../../../common/inputs";
import { flexColumn } from "../../../styles/player/common";
import { newCommonContainer } from "../../../styles/player/containers";
import { GridBreak } from "../competitionCreator/NewBracketBuilder";
import { GreyButton } from "../../Buttons";

interface props {
    // bracket: BracketModel;
    lindex: number;
    dindex: number;
    bindex: number;
    removeBracket(index: number): void;
}

export function FormikBracket({ bindex, dindex, lindex, removeBracket }: props) {
    return (
        <div css={[flexColumn, newCommonContainer, { margin: "25px 0 0 25px" }]}>
            <h5>Bracket: {bindex + 1}</h5>

            {/* daychoices */}
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <MaterialNumberInput
                        name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.maxTeamAmount`}
                        label="Max Amount of Teams"
                    />
                </Grid>
                <GridBreak />
                <Grid item xs={8}>
                    <div>
                        <label>
                            <Field
                                type="checkbox"
                                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.dayChoices`}
                                value="1"
                            />
                            Monday
                        </label>
                        <label>
                            <Field
                                type="checkbox"
                                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.dayChoices`}
                                value="2"
                            />
                            Tuesday
                        </label>
                        <label>
                            <Field
                                type="checkbox"
                                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.dayChoices`}
                                value="3"
                            />
                            Wednesday
                        </label>
                        <label>
                            <Field
                                type="checkbox"
                                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.dayChoices`}
                                value="4"
                            />
                            Thursday
                        </label>
                        <label>
                            <Field
                                type="checkbox"
                                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.dayChoices`}
                                value="5"
                            />
                            Friday
                        </label>
                        <label>
                            <Field
                                type="checkbox"
                                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.dayChoices`}
                                value="6"
                            />
                            Saturday
                        </label>
                        <label>
                            <Field
                                type="checkbox"
                                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.dayChoices`}
                                value="7"
                            />
                            Sunday
                        </label>
                    </div>
                </Grid>

                <Grid item xs={16}>
                    <MaterialTextInput
                        name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.timeChoices`}
                        label="Time Choices (comma separate)"
                    />
                </Grid>
                <Grid item xs={2}>
                    <GreyButton type="button" onClick={() => removeBracket(lindex)}>
                        Pop Bracket
                    </GreyButton>
                </Grid>
            </Grid>

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
