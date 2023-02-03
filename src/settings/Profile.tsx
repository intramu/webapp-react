import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Button, Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { profileEdit } from "../common/validationSchemas";
import { MySelect, TextInputBootstrap } from "../common/inputs";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import useAxios from "../common/hooks/useAxios";
import { PlayerEdit } from "../interfaces/Player";

const initialState = {
    authId: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    gender: "",
    language: "",
    dob: "",
    graduationTerm: "",
    visibility: "",
};

function Profile() {
    const { getRequest } = useAxios();

    const [profile, setProfile] = useState<PlayerEdit>();
    const [error, setError] = useState<string>();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            setLoading(true);
            const response = await getRequest<PlayerEdit>("/api/player");
            if (isErrorResponse(response)) {
                setError(response.errorMessage);
                setLoading(false);
                return;
            }

            setProfile(response);
            setLoading(false);
        };

        getProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // This function will update the profile when the button is clicked
    const editProfile = (values: PlayerEdit) => {
        console.log("Needs to be updated");
        console.log(values);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error sorry :(</div>;
    }

    return (
        <div>
            <h5>
                <u>Profile</u>
            </h5>
            <Formik
                enableReinitialize
                initialValues={profile || initialState}
                validationSchema={Yup.object({
                    emailAddress: Yup.string().email("Invalid emailAddress"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    editProfile(values);
                }}>
                {(formik) => (
                    <Form style={{ width: "50%" }}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <TextInputBootstrap
                                        label="First Name"
                                        name="firstName"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <TextInputBootstrap
                                        label="Last Name"
                                        name="lastName"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} style={{ margin: "auto" }}>
                                <FormGroup>
                                    <img src="/logo192.png" alt="other" />
                                </FormGroup>
                            </Col>
                            <Col md={6} style={{ margin: "auto" }}>
                                <FormGroup>
                                    <button style={{ width: "100%" }}>Change Image</button>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <TextInputBootstrap
                                        label="Email"
                                        name="emailAddress"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Language</Label>
                                    <MySelect label="Gender" name="gender">
                                        <option value="MALE">Male</option>
                                        <option defaultChecked value="FEMALE">
                                            Female
                                        </option>
                                    </MySelect>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Language</Label>
                                    <MySelect label="Language" name="language">
                                        <option value="ENGLISH">English</option>
                                        <option defaultChecked value="SPANISH">
                                            Spanish
                                        </option>
                                        <option value="NIGERIAN">Nigerian</option>
                                    </MySelect>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <TextInputBootstrap
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
                                    <p>{profile?.graduationTerm}</p>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup row>
                            <Label sm={2}>Visibility:</Label>
                            <Col sm={4}>
                                <MySelect label="Visibility" name="visibility">
                                    <option value="PRIVATE">Private</option>
                                    <option defaultChecked value="OPEN">
                                        Open
                                    </option>
                                    <option value="CLOSED">Closed</option>
                                </MySelect>
                            </Col>
                        </FormGroup>
                        <Button type="submit">Update</Button>
                    </Form>
                )}
            </Formik>

            <p>Here are all the current details we have</p>
            <ul>
                {/* <li>Birthday: {user.birthdate}</li>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li> */}
                {/* <li>Token: {token}</li> */}
            </ul>
        </div>
    );
}

export default Profile;
