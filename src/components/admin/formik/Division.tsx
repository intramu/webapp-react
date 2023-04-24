/** @jsxImportSource @emotion/react */
import React, { createRef } from "react";
import { FieldArray } from "formik";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Grid } from "@mui/material";
import {
    MaterialDatePicker,
    MaterialNumberInput,
    MaterialSelectInput,
    MaterialTextInput,
} from "../../../common/inputs";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { BracketModel } from "../../../models/contests/BracketModel";
import { FormikBracket } from "./Bracket";
import {
    DivisionLevel,
    DivisionStatus,
    DivisionType,
} from "../../../utilities/enums/competitionEnum";
import { flexColumn } from "../../../styles/player/common";
import { newCommonContainer } from "../../../styles/player/containers";
import { GridBreak } from "../competitionCreator/NewBracketBuilder";
import { GreyButton } from "../../Buttons";

dayjs.extend(utc);

interface props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik(field: string, value: any, shouldValidate?: boolean | undefined): void;
    division: DivisionModel;
    lindex: number;
    dindex: number;
    removeDivision(index: number): void;
}

export function FormikDivision({ formik, division, lindex, dindex, removeDivision }: props) {
    const removeRef = createRef<HTMLButtonElement>();
    return (
        <div css={[flexColumn, newCommonContainer, { margin: "25px 0 0 25px" }]}>
            <h5>Division: {dindex + 1}</h5>

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <MaterialTextInput
                        name={`leagues.${lindex}.divisions.${dindex}.name`}
                        label="Optional: Name"
                    />
                </Grid>
                <GridBreak />
                <Grid item xs={3}>
                    <MaterialSelectInput
                        enumValue={DivisionType}
                        label="Type"
                        name={`leagues.${lindex}.divisions.${dindex}.type`}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MaterialSelectInput
                        enumValue={DivisionLevel}
                        label="Level"
                        name={`leagues.${lindex}.divisions.${dindex}.level`}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MaterialSelectInput
                        enumValue={DivisionStatus}
                        label="Status"
                        name={`leagues.${lindex}.divisions.${dindex}.status`}
                    />
                </Grid>
                <GridBreak />
                <Grid item xs={3}>
                    <MaterialNumberInput
                        name={`leagues.${lindex}.divisions.${dindex}.maxTeamSize`}
                        label="Max Players on Team"
                    />
                </Grid>
                <Grid item xs={3}>
                    <MaterialNumberInput
                        name={`leagues.${lindex}.divisions.${dindex}.minMenCount`}
                        label="Minimum Required Men on Team"
                    />
                </Grid>
                <Grid item xs={3}>
                    <MaterialNumberInput
                        name={`leagues.${lindex}.divisions.${dindex}.minWomenCount`}
                        label="Minimum Required Women on Team"
                    />
                </Grid>
                <GridBreak />
                <Grid item xs={3}>
                    <MaterialDatePicker
                        name={`leagues.${lindex}.divisions.${dindex}.startDate`}
                        label="Start Date"
                        setFieldValue={formik}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MaterialDatePicker
                        name={`leagues.${lindex}.divisions.${dindex}.endDate`}
                        label="End Date"
                        setFieldValue={formik}
                    />
                </Grid>
                <GridBreak />
                <Grid item xs={3}>
                    <MaterialDatePicker
                        name={`leagues.${lindex}.divisions.${dindex}.registrationStartDate`}
                        label="Registration Start Date"
                        setFieldValue={formik}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MaterialDatePicker
                        name={`leagues.${lindex}.divisions.${dindex}.registrationEndDate`}
                        label="Registration End Date"
                        setFieldValue={formik}
                    />
                </Grid>
                <GridBreak />
                <Grid item xs={6}>
                    <GreyButton type="button" onClick={() => removeDivision(dindex)}>
                        Pop Division
                    </GreyButton>
                    <GreyButton type="button" onClick={() => removeRef.current?.click()}>
                        Push Bracket
                    </GreyButton>
                </Grid>
                {/* <Grid item xs={2}></Grid> */}
            </Grid>

            <FieldArray name={`leagues.${lindex}.divisions.${dindex}.brackets`}>
                {({ push, remove }) => (
                    <>
                        {division.brackets.map((bracket, bindex) => (
                            <FormikBracket
                                key={bindex}
                                bindex={bindex}
                                // bracket={bracket}
                                dindex={dindex}
                                lindex={lindex}
                                removeBracket={remove}
                            />
                        ))}

                        <button
                            type="button"
                            css={{ display: "none" }}
                            ref={removeRef}
                            onClick={() => {
                                push(new BracketModel());
                            }}>
                            Push Bracket
                        </button>
                    </>
                )}
            </FieldArray>
        </div>
    );
}
