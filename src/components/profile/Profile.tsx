import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Button, Grid } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import {
    MaterialDatePicker,
    MaterialExperimentInput,
    MaterialTextInput,
} from "../../common/inputs";
import { Language, PlayerGender, PlayerVisibility } from "../../utilities/enums/userEnum";
import { userRootStore } from "../../pages/_routes";
import { flexCenterHorizontal, flexRow } from "../../styles/player/common";
import { GridBreak } from "../admin/competitionCreator/NewBracketBuilder";
import { unstyledButton } from "../../styles/player/buttons";
import { PlayerModel } from "../../models/PlayerModel";

export const Profile = observer(() => {
    const { player } = userRootStore;

    const [testPlayer] = useState(() => new PlayerModel());

    useEffect(() => {
        testPlayer.fetchPlayer();
    }, [testPlayer]);

    const [isEditing, setIsEditing] = useState(false);

    if (player.state === "pending") {
        return <div>Loading...</div>;
    }
    if (player.error) {
        return <div>Error sorry :(</div>;
    }

    return (
        <>
            <div css={[flexRow, { justifyContent: "space-between", marginBottom: 20 }]}>
                <h5>
                    <u>Profile</u>
                </h5>
                <button css={unstyledButton} onClick={() => setIsEditing((x) => !x)}>
                    {isEditing ? <EditOffIcon /> : <EditIcon />}
                </button>
            </div>
            <Formik
                enableReinitialize
                initialValues={testPlayer}
                validationSchema={Yup.object({
                    emailAddress: Yup.string().email("Invalid emailAddress"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    testPlayer.editPlayer(values);
                    setSubmitting(false);
                    setIsEditing(false);
                }}>
                {(formik) => {
                    const isDisabled = !isEditing || formik.isSubmitting;
                    return (
                        <Form>
                            <Grid container rowSpacing={4} spacing={2}>
                                <Grid item xs={5}>
                                    <MaterialTextInput
                                        label="First Name"
                                        name="firstName"
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <MaterialTextInput
                                        label="Last Name"
                                        name="lastName"
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <GridBreak />
                                <Grid item xs={5} css={flexCenterHorizontal}>
                                    <AccountCircleOutlinedIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    <Button
                                        css={{ width: "100%" }}
                                        disabled={isDisabled}
                                        variant="outlined">
                                        Change Image
                                    </Button>
                                </Grid>
                                <GridBreak />
                                <Grid item xs={10}>
                                    <MaterialTextInput
                                        name="emailAddress"
                                        label="Email Address"
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <GridBreak />
                                <Grid item xs={5}>
                                    <MaterialExperimentInput
                                        name="gender"
                                        label="Gender"
                                        disabled={isDisabled}
                                        enumvalue={PlayerGender}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <MaterialExperimentInput
                                        name="language"
                                        label="Language"
                                        disabled={isDisabled}
                                        enumvalue={Language}
                                    />
                                </Grid>
                                <GridBreak />

                                <Grid item xs={5}>
                                    <MaterialDatePicker
                                        setFieldValue={formik.setFieldValue}
                                        name="dob"
                                        label="Date of Birth"
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <MaterialExperimentInput
                                        name="visibility"
                                        label="Visibility"
                                        disabled={isDisabled}
                                        enumvalue={PlayerVisibility}
                                    />
                                </Grid>
                                <GridBreak />
                                <Grid item xs={5}>
                                    <MaterialTextInput
                                        disabled
                                        label="Graduation Term"
                                        name="graduationTerm"
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                css={{ padding: 10 }}
                                disabled={!isEditing}
                                type="submit"
                                variant="contained">
                                Update
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
});
