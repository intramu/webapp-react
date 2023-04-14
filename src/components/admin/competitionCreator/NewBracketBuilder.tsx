import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Field, FieldArray, Form, Formik } from "formik";
import { MenuItem } from "@mui/material";
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

export const NewBracketBuilder = observer(() => {
    const [store] = useState(() => new LeagueStore());
    const [isName, setIsName] = useState(false);

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
            initialValues={{
                song: "",
                leagues: [new LeagueModel()],
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
            enableReinitialize>
            {(formik) => (
                <Form>
                    <h5>Contest Details</h5>
                    <div>
                        <label>
                            <input type="radio" onChange={() => setIsName(true)} checked={isName} />
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
                    {isName ? (
                        <MaterialTextInput name="name" label="Name" />
                    ) : (
                        <>
                            <MaterialSelectInput
                                name="season"
                                label="Season"
                                enumValue={CompetitionSeason}
                            />
                            <MaterialNumberInput name="term" label="Term" />
                            <MaterialTextInput name="year" label="Year" />
                        </>
                    )}

                    <MaterialSelectInput
                        name="visibility"
                        label="Visibility"
                        enumValue={CompetitionVisibility}
                    />
                    <MaterialSelectInput
                        name="status"
                        label="Status"
                        enumValue={CompetitionStatus}
                    />

                    <FieldArray name="leagues">
                        {({ push, remove }) => (
                            <>
                                <div style={{ marginLeft: 20 }}>
                                    {formik.values.leagues.map((league, lindex) => (
                                        <FormikLeague
                                            formik={formik.setFieldValue}
                                            key={lindex}
                                            league={league}
                                            lindex={lindex}
                                            removeLeague={remove}
                                        />
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        push(new LeagueModel());
                                    }}>
                                    Push League
                                </button>
                            </>
                        )}
                    </FieldArray>

                    <button type="submit">Create</button>
                </Form>
            )}
        </Formik>
    );
});
