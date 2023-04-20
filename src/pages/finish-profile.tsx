/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CSSObject } from "@emotion/react";
import { Button, Grid, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import SendIcon from "@mui/icons-material/Send";
import useAxios from "../common/hooks/useAxios";
import { generateGraduationTerms } from "../utilities/graduationTerm";
import { colors, flexCenterVertical, flexColumn, flexRow } from "../styles/player/common";
import { finishProfileSchema } from "../utilities/formValidation/userValidation";
import { MaterialDatePicker, MaterialExperimentInput, MaterialTextInput } from "../common/inputs";
import { Language, PlayerGender, PlayerVisibility } from "../utilities/enums/userEnum";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { newPostRequest } from "../common/functions/axiosRequests";
import { INewPlayer, IPlayer } from "../interfaces/IPlayer";

const input: CSSObject = {
    backgroundColor: "white",
    borderRadius: 5,
};

const imageSize: CSSObject = {
    height: 300,
    width: 500,
};

interface FormValues {
    player: INewPlayer;
    organizationId: string;
}

interface OrganizationList {
    name: string;
    id: string;
}

export const FinishProfile = observer(() => {
    const [graduationList, setGraduationList] = useState([{ value: "", display: "" }]);
    const [organizationList, setOrganizationList] = useState([{ name: "", id: "" }]);

    const { getRequest } = useAxios();

    const { user } = useAuth0();
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        console.log("values", values);
        // values.dob = values.dob.format("YYYY-MM-DD");

        const response = await newPostRequest<IPlayer, INewPlayer>(
            `/organizations/${values.organizationId}/players`,
            {
                ...values.player,
                dob: values.player.dob.format("YYYY-MM-DD"),
            }
        );
        if (isErrorResponse(response)) {
            return;
        }
        // checks every two seconds for state in case api call takes awhile
        const timer = setInterval(() => {
            if (response) {
                navigate("/dashboard");
            }
        }, 2000);
        // eventually stop checking state
        setTimeout(() => {
            clearInterval(timer);
        }, 6000);
    };

    useEffect(() => {
        setGraduationList(generateGraduationTerms());
        const fetch = async () => {
            const response = await getRequest<OrganizationList[]>("/organizations/list");
            if (isErrorResponse(response)) {
                return;
            }
            setOrganizationList(response);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div css={[flexColumn, { justifyContent: "center", height: "100%" }]}>
            <div
                css={[
                    flexRow,
                    {
                        backgroundColor: colors.content,
                        height: "80%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        padding: 100,
                    },
                ]}>
                <div css={[flexCenterVertical, { flex: 1, flexDirection: "column" }]}>
                    <h2 css={{ marginBottom: 40 }}>Make sure to finish creating your profile</h2>
                    <img css={imageSize} src="/finishProfile.png" alt="Illustration" />
                </div>
                <div css={{ flex: 1 }}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            player: {
                                authId: user.sub ?? "",
                                firstName: "",
                                lastName: "",
                                emailAddress: user.email ?? "",
                                gender: "",
                                language: "",
                                dob: null,
                                graduationTerm: "",
                                visibility: "",
                                image: "",
                                status: "",
                                dateCreated: "",
                            },
                            organizationId: "",
                        }}
                        validationSchema={finishProfileSchema}
                        // validationSchema={finishProfileSchema}
                        onSubmit={(values: any, { setSubmitting }) => {
                            handleSubmit(values);
                            setSubmitting(false);
                        }}>
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit}>
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
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <MaterialExperimentInput
                                            css={input}
                                            label="Language"
                                            name="player.language"
                                            variant="outlined"
                                            enumvalue={Language}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MaterialExperimentInput
                                            css={input}
                                            label="Gender"
                                            name="player.gender"
                                            variant="outlined"
                                            enumvalue={PlayerGender}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MaterialExperimentInput
                                            css={input}
                                            label="Visibility"
                                            name="player.visibility"
                                            variant="outlined"
                                            enumvalue={PlayerVisibility}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        {/* <MaterialDatePicker
                                            label="Date of Birth"
                                            name="player.dob"
                                            setFieldValue={formik.setFieldValue}
                                            css={input}
                                        /> */}
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                            adapterLocale="en">
                                            <DatePicker
                                                css={input}
                                                label="Date of Birth"
                                                value={formik.values.player.dob}
                                                onChange={(value) => {
                                                    formik.setFieldValue("player.dob", value, true);
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MaterialExperimentInput
                                            css={input}
                                            label="Select Graduation Term"
                                            name="player.graduationTerm"
                                            variant="outlined">
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
                                            variant="outlined">
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
                                            <Field
                                                hidden
                                                name="player.image"
                                                accept="image/*"
                                                multiple
                                                type="file"
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label>Profile Image</label>
                                    </Grid>
                                </Grid>

                                <Button
                                    disabled={!(formik.dirty && formik.isValid)}
                                    type="submit"
                                    variant="outlined"
                                    endIcon={<SendIcon />}>
                                    Create
                                </Button>
                                {formik.isSubmitting && <p>Loading</p>}
                                {/* {player.error && !formik.isSubmitting && (
                                    <b>Error please try again another time</b>
                                )} */}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
});
