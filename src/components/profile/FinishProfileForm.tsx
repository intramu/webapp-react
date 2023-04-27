import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { CSSObject } from "@emotion/react";
import dayjs from "dayjs";
import { Field, FormikProps } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MaterialExperimentInput, MaterialTextInput } from "../../common/inputs";
import { generateGraduationTerms } from "../../utilities/graduationTerm";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { Language, PlayerGender, PlayerVisibility } from "../../utilities/enums/userEnum";
import { newGetRequest } from "../../common/functions/axiosRequests";
import { GridBreak } from "../admin/competitionCreator/NewBracketBuilder";

const input: CSSObject = {
    backgroundColor: "white",
    borderRadius: 5,
};

interface OrganizationList {
    name: string;
    id: string;
}

interface props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: FormikProps<any>;
}

export function FinishProfileForm({ formik }: props) {
    const [graduationList, setGraduationList] = useState([{ value: "", display: "" }]);
    const [organizationList, setOrganizationList] = useState([{ name: "", id: "" }]);

    const [isValid, setIsValid] = useState(true);

    // fetch organization list
    useEffect(() => {
        setGraduationList(generateGraduationTerms());
        const fetch = async () => {
            const response = await newGetRequest<OrganizationList[]>("/organizations/signup/list");
            if (isErrorResponse(response)) {
                return;
            }
            setOrganizationList(response);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchEmailStatus = async (orgId: string) => {
        const response = await newGetRequest<{ emailAddress: string; organizationId: string }>(
            `/organizations/${orgId}/email/${formik.values.player.emailAddress}`
        );
        if (isErrorResponse(response)) {
            setIsValid(false);
            return false;
        }

        setIsValid(true);
        return true;
    };

    const tempInjectValues = () => {
        formik.setFieldValue("player.firstName", "Mark");
        formik.setFieldValue("player.lastName", "Reha");
        formik.setFieldValue("player.language", "ENGLISH");
        formik.setFieldValue("player.gender", "MALE");
        formik.setFieldValue("player.visibility", "PRIVATE");
        formik.setFieldValue(
            "player.dob",
            dayjs().set("date", 1).set("month", 7).set("year", 1949)
        );
        formik.setFieldValue("player.graduationTerm", "Spring-2023");
    };

    return (
        <Grid container columnSpacing={2} columns={12} rowSpacing={4}>
            <Grid item xs={6}>
                <MaterialTextInput
                    css={input}
                    name="player.firstName"
                    label="First Name"
                    variant="outlined"
                    disabled={formik.isSubmitting}
                />
            </Grid>
            <Grid item xs={6}>
                <MaterialTextInput
                    css={input}
                    name="player.lastName"
                    label="Last Name"
                    variant="outlined"
                    disabled={formik.isSubmitting}
                />
            </Grid>

            <Grid item xs={12}>
                <MaterialTextInput
                    css={input}
                    InputProps={{
                        readOnly: true,
                    }}
                    name="player.emailAddress"
                    label="Email Address"
                    variant="outlined"
                    disabled={formik.isSubmitting}
                />
            </Grid>

            <Grid item xs={4}>
                <MaterialExperimentInput
                    css={input}
                    label="Language"
                    name="player.language"
                    variant="outlined"
                    enumvalue={Language}
                    disabled={formik.isSubmitting}
                />
            </Grid>
            <Grid item xs={4}>
                <MaterialExperimentInput
                    css={input}
                    label="Gender"
                    name="player.gender"
                    variant="outlined"
                    enumvalue={PlayerGender}
                    disabled={formik.isSubmitting}
                />
            </Grid>
            <Grid item xs={4}>
                <MaterialExperimentInput
                    css={input}
                    label="Visibility"
                    name="player.visibility"
                    variant="outlined"
                    enumvalue={PlayerVisibility}
                    disabled={formik.isSubmitting}
                />
            </Grid>

            <Grid item xs={4}>
                {/* <MaterialDatePicker
                label="Date of Birth"
                name="player.dob"
                setFieldValue={formik.setFieldValue}
                css={input}
            /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                    <DatePicker
                        css={input}
                        label="Date of Birth"
                        value={formik.values.player.dob}
                        onChange={(value) => {
                            formik.setFieldValue("player.dob", value, true);
                        }}
                        disabled={formik.isSubmitting}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
                <MaterialExperimentInput
                    css={input}
                    label="Select Graduation Term"
                    name="player.graduationTerm"
                    variant="outlined"
                    disabled={formik.isSubmitting}>
                    {graduationList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.display}
                        </MenuItem>
                    ))}
                </MaterialExperimentInput>
            </Grid>

            <Grid item xs={12}>
                <MaterialExperimentInput
                    css={input}
                    name="organizationId"
                    label="Organization"
                    variant="outlined"
                    disabled={formik.isSubmitting}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        formik.setFieldValue("organizationId", e.target.value);
                        fetchEmailStatus(e.target.value);
                    }}>
                    {organizationList.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </MaterialExperimentInput>
                {!isValid && <b>You are not authorized to join this organization</b>}
            </Grid>

            <Grid item xs={2}>
                <Button variant="contained" component="label">
                    Upload
                    {/* <Field
                        onChange={(e: any) => {
                            formik.setFieldValue(
                                "player.image",
                                e.currentTarget.files && e.currentTarget.files[0]
                            );
                        }}
                        hidden
                        name="player.image"
                        accept="image/*"
                        multiple
                        type="file"
                    /> */}
                    <input
                        hidden
                        type="file"
                        name="player.image"
                        accept="image/*"
                        onChange={(e) => {
                            formik.setFieldValue(
                                "player.image",
                                e.currentTarget.files && e.currentTarget.files[0]
                            );
                        }}
                    />
                </Button>
            </Grid>
            <Grid item xs={2}>
                {formik.values.player.image && <label>{formik.values.player.image.name}</label>}
            </Grid>
            <GridBreak />
            <Grid item xs={2}>
                <Button
                    disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting || !isValid}
                    type="submit"
                    variant="outlined"
                    endIcon={<SendIcon />}>
                    Create
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button css={{ marginLeft: 10 }} onClick={tempInjectValues}>
                    Inject
                </Button>
            </Grid>
        </Grid>
    );
}
