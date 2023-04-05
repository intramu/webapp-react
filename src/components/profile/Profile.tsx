/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Button, Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { IPlayer } from "../../interfaces/IPlayer";
import useSWR from "../../common/hooks/useSWR";
import useAxios from "../../common/hooks/useAxios";
import { Gender, Language, Status, Visibility } from "../../common/enums";
import { SelectInput, TextInput } from "../../common/inputs";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
// import { getRequest } from "../../common/functions/axiosRequests";
import { dynamicButton } from "../../styles/scss/player/buttons";

const initialState = {
    authId: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    gender: Gender.MALE,
    language: Language.ENGLISH,
    dob: new Date().toDateString(),
    graduationTerm: "2023",
    visibility: Visibility.PRIVATE,
    image: "",
    status: Status.ACTIVE,
    dateCreated: new Date(),
};

export function Profile() {
    const [player, setPlayer] = useState<IPlayer>(initialState);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>();

    const [isEditing, setIsEditing] = useState(true);

    const { patchRequest, getRequest } = useAxios();

    // This function will update the profile when the button is clicked
    const editProfile = async (values: IPlayer) => {
        const response = await patchRequest<IPlayer, IPlayer>("/players", values);
        console.log("response", response);
        console.log("values", values);
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await getRequest<IPlayer>("/players");
            // const response = await getRequest<IPlayer>("/players");
            if (isErrorResponse(response)) {
                // handle error
                return;
            }

            response.dob = convertDate(response.dob);
            setPlayer(response);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const convertDate = (date: string): string => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("sv-SE");
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error sorry :(</div>;
    }
    return (
        <>
            <h5>
                <u>Profile</u>
            </h5>
            <button css={[dynamicButton]} onClick={() => setIsEditing((x) => !x)}>
                {isEditing ? "Edit" : "Cancel"}
            </button>

            <Formik
                enableReinitialize
                initialValues={player}
                validationSchema={Yup.object({
                    emailAddress: Yup.string().email("Invalid emailAddress"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    editProfile(values);
                }}>
                {(formik) => (
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <TextInput
                                        label="First Name"
                                        name="firstName"
                                        type="text"
                                        disabled={isEditing || formik.isSubmitting}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Last Name</Label>
                                    <TextInput
                                        label="Last Name"
                                        name="lastName"
                                        type="text"
                                        disabled={isEditing || formik.isSubmitting}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} style={{ margin: "auto" }}>
                                <FormGroup>
                                    <Label>Profile Pic</Label>

                                    <img src="/logo192.png" alt="other" />
                                </FormGroup>
                            </Col>
                            <Col md={6} style={{ margin: "auto" }}>
                                <FormGroup>
                                    <button
                                        style={{ width: "100%" }}
                                        disabled={isEditing || formik.isSubmitting}>
                                        Change Image
                                    </button>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Email Address</Label>

                                    <TextInput
                                        label="Email"
                                        name="emailAddress"
                                        type="text"
                                        disabled={isEditing || formik.isSubmitting}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Gender</Label>
                                    <SelectInput
                                        label="Gender"
                                        name="gender"
                                        disabled={isEditing || formik.isSubmitting}>
                                        <option value={Gender.MALE}>Male</option>
                                        <option defaultChecked value={Gender.FEMALE}>
                                            Female
                                        </option>
                                    </SelectInput>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Language</Label>
                                    <SelectInput
                                        label="Language"
                                        name="language"
                                        disabled={isEditing || formik.isSubmitting}>
                                        <option value="ENGLISH">English</option>
                                        {/* <option defaultChecked value="SPANISH">
                                            Spanish
                                        </option>
                                        <option value="NIGERIAN">Nigerian</option> */}
                                    </SelectInput>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Date Of Birth</Label>

                                    <TextInput
                                        disabled
                                        label="Date of Birth"
                                        name="dob"
                                        type="date"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Graduation Term:</Label>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <TextInput
                                        disabled
                                        label="Graduation Term"
                                        name="graduationTerm"
                                        type="text"
                                    />
                                    {/* <span>{data?.graduationTerm}</span> */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup row>
                            <Label sm={2}>Visibility:</Label>
                            <Col sm={4}>
                                <SelectInput
                                    label="Visibility"
                                    name="visibility"
                                    disabled={isEditing || formik.isSubmitting}>
                                    <option value="PRIVATE">Private</option>
                                    <option defaultChecked value="OPEN">
                                        Open
                                    </option>
                                    <option value="CLOSED">Closed</option>
                                </SelectInput>
                            </Col>
                        </FormGroup>
                        {!isEditing && <Button type="submit">Update</Button>}
                    </Form>
                )}
            </Formik>
        </>
    );
}
