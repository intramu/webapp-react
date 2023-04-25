import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { CSSObject } from "@emotion/react";
import { Field, FormikProps } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MaterialExperimentInput, MaterialTextInput } from "../../common/inputs";
import useAxios from "../../common/hooks/useAxios";
import { generateGraduationTerms } from "../../utilities/graduationTerm";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { Language, PlayerGender, PlayerVisibility } from "../../utilities/enums/userEnum";

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

    const { getRequest } = useAxios();

    // fetch organization list
    useEffect(() => {
        setGraduationList(generateGraduationTerms());
        const fetch = async () => {
            const response = await getRequest<OrganizationList[]>("/organizations/signup/list");
            if (isErrorResponse(response)) {
                return;
            }
            setOrganizationList(response);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
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
                        disabled={formik.isSubmitting}>
                        {organizationList.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </MaterialExperimentInput>
                </Grid>

                <Grid item xs={2}>
                    <Button variant="contained" component="label">
                        Upload
                        <Field hidden name="player.image" accept="image/*" multiple type="file" />
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <label>Profile Image</label>
                </Grid>
            </Grid>

            <Button
                disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}
                type="submit"
                variant="outlined"
                endIcon={<SendIcon />}>
                Create
            </Button>
        </>
    );
}
