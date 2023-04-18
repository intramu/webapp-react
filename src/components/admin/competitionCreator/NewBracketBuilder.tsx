/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Field, FieldArray, Form, Formik } from "formik";
import { Grid, MenuItem } from "@mui/material";
import { LeagueStore } from "../../../models/contests/LeagueStore";
import { LeagueModel } from "../../../models/contests/LeagueModel";
import { FormikLeague } from "../formik/League";
import {
    MaterialNumberInput,
    MaterialSelectInput,
    MaterialTextInput,
} from "../../../common/inputs";
import {
    CompetitionVisibility,
    CompetitionStatus,
    CompetitionSeason,
} from "../../../utilities/enums/competitionEnum";
import { flexColumn } from "../../../styles/player/common";
import { commonContainer, newCommonContainer } from "../../../styles/player/containers";
import { GreyButton } from "../../Buttons";
import { ContestModel } from "../../../models/contests/ContestModel";
import { newGetRequest, newPostRequest } from "../../../common/functions/axiosRequests";

export function GridBreak() {
    return <Grid css={{ width: "100%" }} />;
}

export const NewBracketBuilder = observer(() => {
    const [store] = useState(() => new LeagueStore());
    const [isName, setIsName] = useState(false);

    const handleSubmit = async (values: ContestModel) => {
        const response = await newPostRequest<boolean, ContestModel>("/contests", values);
        console.log(response);
    };

    return (
        // <>
        //     <div>
        //         {store.leagues.map((league, index) => (
        //             <NewLeague
        //                 key={index}
        //                 league={league}
        //                 removeLeague={store.removeLeague}
        //                 index={index}
        //             />
        //         ))}
        //     </div>
        //     <button onClick={store.pushLeague}>Push League</button>
        // </>
        <Formik
            initialValues={new ContestModel()}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
            enableReinitialize>
            {(formik) => (
                <Form>
                    <div>
                        <h3>Contest Details</h3>
                        <GreyButton type="submit">Create</GreyButton>
                        <div>
                            Type:
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    onChange={() => setIsName(true)}
                                    checked={isName}
                                />
                                Name
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    onChange={() => setIsName(false)}
                                    checked={!isName}
                                />
                                Season/Term/Year
                            </label>
                        </div>
                        <br />
                        <Grid container spacing={2}>
                            {isName ? (
                                <>
                                    <Grid item xs={3}>
                                        <MaterialTextInput name="name" label="Name" />
                                    </Grid>
                                    <GridBreak />
                                </>
                            ) : (
                                <>
                                    <Grid item xs={3}>
                                        <MaterialSelectInput
                                            name="season"
                                            label="Season"
                                            enumValue={CompetitionSeason}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MaterialNumberInput name="term" label="Term" />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MaterialTextInput name="year" label="Year" />
                                    </Grid>
                                    <GridBreak />
                                </>
                            )}
                            <Grid item xs={3}>
                                <MaterialSelectInput
                                    name="visibility"
                                    label="Visibility"
                                    enumValue={CompetitionVisibility}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <MaterialSelectInput
                                    name="status"
                                    label="Status"
                                    enumValue={CompetitionStatus}
                                />
                            </Grid>
                        </Grid>
                        <FieldArray name="leagues">
                            {({ push, remove }) => (
                                <>
                                    <>
                                        {formik.values.leagues.map((league, lindex) => (
                                            <FormikLeague
                                                formik={formik.setFieldValue}
                                                key={lindex}
                                                league={league}
                                                lindex={lindex}
                                                removeLeague={remove}
                                            />
                                        ))}
                                    </>
                                    <GreyButton
                                        type="button"
                                        onClick={() => {
                                            push(new LeagueModel());
                                        }}>
                                        Push League
                                    </GreyButton>
                                </>
                            )}
                        </FieldArray>
                    </div>
                </Form>
            )}
        </Formik>
    );
});
