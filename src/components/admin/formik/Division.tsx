import React from "react";
import { MenuItem } from "@mui/material";
import { FieldArray } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import {
    MaterialDatePicker,
    MaterialNumberInput,
    MaterialSelectInput,
    MaterialTextInput,
} from "../../../common/inputs";
import { Sport } from "../../../utilities/enums/commonEnum";
import { DivisionModel } from "../../../models/contests/DivisionModel";
import { BracketModel } from "../../../models/contests/BracketModel";
import { FormikBracket } from "./Bracket";
import {
    DivisionLevel,
    DivisionStatus,
    DivisionType,
} from "../../../utilities/enums/competitionEnum";

dayjs.extend(utc);

interface props {
    formik(field: string, value: any, shouldValidate?: boolean | undefined): void;
    division: DivisionModel;
    lindex: number;
    dindex: number;
    removeDivision(index: number): void;
}

export function FormikDivision({ formik, division, lindex, dindex, removeDivision }: props) {
    return (
        <div>
            <span>Division: {dindex + 1}</span>

            <MaterialTextInput
                name={`leagues.${lindex}.divisions.${dindex}.name`}
                label="Optional: Name"
            />
            <MaterialSelectInput
                enumValue={DivisionType}
                label="Type"
                name={`leagues.${lindex}.divisions.${dindex}.type`}
            />
            <MaterialSelectInput
                enumValue={DivisionLevel}
                label="Level"
                name={`leagues.${lindex}.divisions.${dindex}.level`}
            />
            <MaterialSelectInput
                enumValue={DivisionStatus}
                label="Status"
                name={`leagues.${lindex}.divisions.${dindex}.status`}
            />
            <MaterialNumberInput
                name={`leagues.${lindex}.divisions.${dindex}.maxTeamSize`}
                label="Max Players on Team"
            />
            <MaterialNumberInput
                name={`leagues.${lindex}.divisions.${dindex}.minMenCount`}
                label="Minimum Required Men on Team"
            />
            <MaterialNumberInput
                name={`leagues.${lindex}.divisions.${dindex}.minWomenCount`}
                label="Minimum Required Women on Team"
            />
            <MaterialDatePicker
                name={`leagues.${lindex}.divisions.${dindex}.startDate`}
                label="Start Date"
                setFieldValue={formik}
            />
            <MaterialDatePicker
                name={`leagues.${lindex}.divisions.${dindex}.endDate`}
                label="End Date"
                setFieldValue={formik}
            />
            <MaterialDatePicker
                name={`leagues.${lindex}.divisions.${dindex}.registrationStartDate`}
                label="Registration Start Date"
                setFieldValue={formik}
            />
            <MaterialDatePicker
                name={`leagues.${lindex}.divisions.${dindex}.registrationEndDate`}
                label="Registration End Date"
                setFieldValue={formik}
            />

            <button type="button" onClick={() => removeDivision(dindex)}>
                Remove
            </button>

            <FieldArray name={`leagues.${lindex}.divisions.${dindex}.brackets`}>
                {({ push, remove }) => (
                    <div style={{ marginLeft: 20 }}>
                        {division.brackets.map((bracket, bindex) => (
                            <FormikBracket
                                key={bindex}
                                bindex={bindex}
                                bracket={bracket}
                                dindex={dindex}
                                lindex={lindex}
                                removeBracket={remove}
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() => {
                                push(new BracketModel());
                            }}>
                            Push Bracket
                        </button>
                    </div>
                )}
            </FieldArray>
        </div>
    );
}
