import React from "react";
import { Field, FieldArray, Form } from "formik";
import { MaterialTextInput } from "../../../common/inputs";
import { LeagueModel } from "../../../models/contests/LeagueModel";
import { DivisionModel } from "../../../models/contests/DivisionModel";

interface fcprops {
    lindex: number;
    dindex: number;
    division: DivisionModel;
}
export function SubSubForm({ dindex, division, lindex }: fcprops) {
    return (
        <>
            <MaterialTextInput
                name={`leagues.${lindex}.divisions.${dindex}.name`}
                label="Optional: Name"
                variant="outlined"
            />
            {/* <Form>
                <FieldArray name="divisions">
                    {({ push }) => (
                        <>
                            {divi.divisions.map((division, dIndex) => (
                                // <MaterialTextInput
                                //     name={`leagues.${index}.divisions.${dIndex}.name`}
                                //     label="Optional: Name"
                                //     variant="outlined"
                                // />
                                <h1>wehat</h1>
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
            </Form> */}
        </>
    );
}
