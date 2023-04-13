/* eslint-disable react/jsx-props-no-spreading */
/** @jsxImportSource @emotion/react */
import { useAuth0 } from "@auth0/auth0-react";
import { CSSObject } from "@emotion/react";
import { Button, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, useField } from "formik";
import { observer } from "mobx-react-lite";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import PendingIcon from "@mui/icons-material/Pending";
import React, { useEffect, useState } from "react";
import { PlayerModel } from "../models/PlayerModel";
import useAxios from "../common/hooks/useAxios";
import { generateGraduationTerms } from "../utilities/graduationTerm";
import { colors, flexColumn, flexRow } from "../styles/player/common";
import { finishProfileSchema } from "../utilities/formValidation/userValidation";
import { MaterialTextInput } from "../common/inputs";
import { Language, PlayerGender, PlayerVisibility } from "../utilities/enums/userEnum";

const input: CSSObject = {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
};

interface FormValues {
    player: PlayerModel;
    organizationId: string;
}

export const FinishProfile = observer(() => {
    const [player] = useState(() => new PlayerModel());

    const [graduationList, setGraduationList] = useState([{ value: "", display: "" }]);
    const [organizationList, setOrganizationList] = useState([
        { name: "Grand Canyon University", value: "dab32727-cb7c-4320-8865-6f1b842785ed" },
    ]);

    const { getRequest } = useAxios();

    const { user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        setGraduationList(generateGraduationTerms());

        player.emailAddress = user?.email ?? "";
        player.authId = user?.sub ?? "";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <div css={{ flex: 1, textAlign: "center" }}>
                    <h2>Make sure to finish creating your profile</h2>
                </div>
                <div css={{ flex: 1 }}>
                    <Formik
                        initialValues={{
                            player,
                            organizationId: "",
                        }}
                        // validationSchema={finishProfileSchema}
                        onSubmit={(values: FormValues, { setSubmitting }) => {
                            console.log(JSON.stringify(values));
                            player.formikToPlayerModel(values.player);
                            player.createPlayer(values.organizationId);

                            // checks every two seconds for state in case api call takes awhile
                            const timer = setInterval(() => {
                                if (player.state === "success") {
                                    setSubmitting(false);
                                    navigate("/dashboard");
                                } else if (player.state === "done") {
                                    setSubmitting(false);
                                }
                            }, 2000);

                            // eventually stops checking state
                            setTimeout(() => {
                                clearInterval(timer);
                                setSubmitting(false);
                            }, 6000);
                        }}>
                        {(formik) => (
                            <Form css={flexColumn} onSubmit={formik.handleSubmit}>
                                <MaterialTextInput
                                    css={input}
                                    name="player.firstName"
                                    label="First Name"
                                    variant="outlined"
                                    disabled={formik.isSubmitting}
                                />

                                <MaterialTextInput
                                    css={input}
                                    name="player.lastName"
                                    label="Last Name"
                                    variant="outlined"
                                />
                                <MaterialTextInput
                                    css={input}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    name="player.emailAddress"
                                    label="Email Address"
                                    variant="outlined"
                                />
                                <MaterialTextInput
                                    css={input}
                                    name="player.language"
                                    label="Language"
                                    variant="outlined"
                                    defaultValue=""
                                    select>
                                    {(Object.keys(Language) as Array<Language>).map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MaterialTextInput>

                                <MaterialTextInput
                                    css={input}
                                    name="player.gender"
                                    select
                                    label="Select Gender"
                                    variant="outlined">
                                    {(Object.keys(PlayerGender) as Array<PlayerGender>).map(
                                        (option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        )
                                    )}
                                </MaterialTextInput>

                                <MaterialTextInput
                                    css={input}
                                    name="player.visibility"
                                    select
                                    label="Select Visibility"
                                    variant="outlined">
                                    {(Object.keys(PlayerVisibility) as Array<PlayerVisibility>).map(
                                        (option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        )
                                    )}
                                </MaterialTextInput>

                                <MaterialTextInput
                                    css={input}
                                    name="player.graduationTerm"
                                    select
                                    label="Select Graduation Term"
                                    variant="outlined">
                                    {graduationList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.display}
                                        </MenuItem>
                                    ))}
                                </MaterialTextInput>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                                    <DatePicker
                                        css={input}
                                        label="Date of Birth"
                                        value={formik.values.player.dob}
                                        onChange={(value) => {
                                            formik.setFieldValue("player.dob", value, true);
                                        }}
                                    />
                                </LocalizationProvider>

                                <MaterialTextInput
                                    css={input}
                                    name="organizationId"
                                    select
                                    label="Organization"
                                    variant="outlined">
                                    {organizationList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </MaterialTextInput>
                                <div css={flexRow}>
                                    <label>Profile Image</label>
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
                                </div>

                                <Button
                                    disabled={!(formik.dirty && formik.isValid)}
                                    type="submit"
                                    variant="outlined"
                                    endIcon={<SendIcon />}>
                                    Create
                                </Button>
                                {formik.isSubmitting && <p>Loading</p>}
                                {player.error && !formik.isSubmitting && (
                                    <b>Error please try again another time</b>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
});
