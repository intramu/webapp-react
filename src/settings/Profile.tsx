import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Button, Col, FormGroup, Label, Row } from "reactstrap";
import { profileEdit } from "../common/validationSchemas";
import { MySelect, TextInputBootstrap } from "../common/inputs";
import { apiGetPlayerInfo } from "../common/api";

const dummyProfileData = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "MALE",
    language: "ENGLISH",
    dob: "02/21/2001",
    graduationTerm: "Spring 2023",
    visibility: "PRIVATE",
};

function Profile() {
    const { getAccessTokenSilently } = useAuth0();
    // const [token, setToken] = useState<string>();
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        language: "",
        dob: "",
        graduationTerm: "",
        visibility: "",
    });

    useEffect(() => {
        const getProfileInfo = async () => {
            // todo: perform api request to fetch user data
            const token = await getAccessTokenSilently();
            const response = await apiGetPlayerInfo(token);

            console.log(response);

            if (response.status === 200) {
                setProfile(response.data);
            } else {
                console.log("error");
            }
        };

        getProfileInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const editProfile = () => {};

    // if (!user) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <h5>
                <u>Profile</u>
            </h5>
            <Formik
                initialValues={profile}
                enableReinitialize
                validationSchema={profileEdit}
                onSubmit={(values, { setSubmitting }) => {
                    alert(values);
                }}>
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
                                <TextInputBootstrap label="Last Name" name="lastName" type="text" />
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
                                    type="email"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Language</Label>
                                <MySelect label="Gender" name="gender">
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
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
                                    <option value="SPANISH">Spanish</option>
                                    <option value="NIGERIAN">Nigerian</option>
                                </MySelect>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <TextInputBootstrap label="Date of Birth" name="dob" type="date" />
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
                                <p>{profile.graduationTerm}</p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup row>
                        <Label sm={2}>Visibility:</Label>
                        <Col sm={4}>
                            <MySelect label="Visibility" name="visibility">
                                <option value="PRIVATE">Private</option>
                                <option value="OPEN">Open</option>
                                <option value="CLOSED">Closed</option>
                            </MySelect>
                        </Col>
                    </FormGroup>
                    <Button type="submit">Save</Button>
                </Form>
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
