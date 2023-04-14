import React from "react";
import { Field } from "formik";
import { MaterialNumberInput, MaterialTextInput } from "../../../common/inputs";
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

            {/* daychoices */}
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

            <MaterialNumberInput
                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.maxTeamAmount`}
                label="Max Amount of Teams"
            />
            <MaterialTextInput
                name={`leagues.${lindex}.divisions.${dindex}.brackets.${bindex}.timeChoices`}
                label="Time Choices (comma separate)"
            />

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
