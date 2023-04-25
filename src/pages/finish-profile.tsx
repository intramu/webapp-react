import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { colors, flexCenterVertical, flexColumn, flexRow } from "../styles/player/common";
import { finishProfileSchema } from "../utilities/formValidation/userValidation";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { newPostRequest } from "../common/functions/axiosRequests";
import { IPlayer } from "../interfaces/IPlayer";
import { FinishProfileForm } from "../components/profile/FinishProfileForm";
import { Language, PlayerGender, PlayerVisibility } from "../utilities/enums/userEnum";

interface IFinishProfile {
    authId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    dob: dayjs.Dayjs | null;
    language?: Language;
    gender?: PlayerGender;
    visibility?: PlayerVisibility;
    graduationTerm: string;
    image: string;
    status: string;
    dateCreated: string;
}

interface FormSubmit extends Omit<IFinishProfile, "dob"> {
    dob: string;
}

interface FormValues {
    player: IFinishProfile;
    organizationId: string;
}

export const FinishProfile = observer(() => {
    const { user } = useAuth0();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    // const handleSubmit = async (values: FormValues) => {};

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
                    <img
                        css={{ height: 300, width: 500 }}
                        src="/finishProfile.png"
                        alt="Illustration"
                    />
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
                                dob: null,
                                language: undefined,
                                gender: undefined,
                                visibility: undefined,
                                image: "",
                                graduationTerm: "",
                                status: "",
                                dateCreated: "",
                            },
                            organizationId: "",
                        }}
                        validationSchema={finishProfileSchema}
                        onSubmit={(values: FormValues, { setSubmitting }) => {
                            setTimeout(async () => {
                                const response = await newPostRequest<IPlayer, FormSubmit>(
                                    `/organizations/${values.organizationId}/players`,
                                    {
                                        ...values.player,
                                        dob: values.player.dob?.format("YYYY-MM-DD") ?? "",
                                    }
                                );
                                if (isErrorResponse(response)) {
                                    setError(response.errorMessage);
                                    setSubmitting(false);
                                    return;
                                }
                                navigate("/");
                            }, 1000);
                        }}>
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit}>
                                <FinishProfileForm formik={formik} />
                                {formik.isSubmitting && <b>Loading...</b>}
                                {error && !formik.isSubmitting && (
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
