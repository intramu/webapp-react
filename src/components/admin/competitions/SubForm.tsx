import React from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { MaterialTextInput } from "../../../common/inputs";
import { LeagueModel } from "../../../models/contests/LeagueModel";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { SubSubForm } from "./SubSubForm";

export function SubForm({ index, league }: { index: number; league: LeagueModel }) {
    return (
        <>
            <MaterialTextInput
                name={`leagues.${index}.name`}
                label="Optional: Name"
                variant="outlined"
            />
            <Field type="text" name={`leagues.${index}.sport`} />
            <Form>
                <FieldArray name={`leagues.${index}.divisions`}>
                    {({ push }) => (
                        <>
                            {league.divisions.map((division, dIndex) => (
                                // <h2>Division</h2>
                                <SubSubForm
                                    key={dIndex}
                                    lindex={index}
                                    dindex={dIndex}
                                    division={division}
                                />
                                // <MaterialTextInput
                                //     name={`leagues.${index}.divisions.${dIndex}.name`}
                                //     label="Optional: Name"
                                //     variant="outlined"
                                // />
                            ))}
                            <button type="button" onClick={() => push(new DivisionModel())}>
                                Push Division
                            </button>
                        </>
                        // {league.}
                        // {league.divisions.map((division, dIndex) => (
                        //     <MaterialTextInput
                        //     name={`leagues.${index}.divisions.${dIndex}.name`}
                        //     label="Optional: Name"
                        //     variant="outlined"
                        // />
                        // ))}
                    )}
                </FieldArray>
            </Form>
        </>
    );
}
