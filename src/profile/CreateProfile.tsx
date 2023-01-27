import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import instance from "../endpoint";
import jwtDecode from "jwt-decode";
import { Field, Form, Formik } from "formik";
import { Col, Container, FormFeedback, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { MySelect, TextInputBootstrap } from "../common/inputs";

export default function CreateProfile() {
    const tempOrgList = [
        { name: "Grand Canyon University", id: "uniqueuuid1" },
        { name: "Arizona State University", id: "uniqueuuid2" },
    ];

    const [organizationList, setOrganizationList] = useState(tempOrgList);
    const urlParams = new URLSearchParams(window.location.search);
    // const state = urlParams.get("state");
    const urlToken = urlParams.get("token");

    const navigate = useNavigate();

    // ! REVISIT
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getToken = async (): Promise<any> => {
        if (!urlToken) {
            throw new Error("No token");
        }
        const decoded = jwtDecode(urlToken);
        return decoded;
    };

    const getOrganizationList = () => {
        // perform api call here to grab the list
    };

    const handleFormSubmit = async () => {
        // call the api endpoint that creates the player profile and assigns there auth0 id
        // to an organization
    };

    const handleSkipSubmit = () => {
        console.log("skipping");
        navigate("/dashboard");
    };

    return (
        <div style={{ padding: "10px" }}>
            <h1>Create Profile</h1>
            <h3>Make sure to finish creating your profile</h3>
            <p>
                You will be allowed to explore your organization without creating your profile, but
                you will not be able to partake in any Intramural activities until it is finished.
            </p>
            <hr />
            <Formik
                initialValues={{
                    id: "",
                    firstName: "",
                    lastName: "",
                    gender: "male",
                    language: "english",
                    graduationTerm: "",
                    dateOfBirth: "",
                    profileVisibility: "private",
                    profileCompletionStatus: "Incomplete",
                }}
                onSubmit={(values: any) => {
                    console.log(values);

                    // alert(values);
                    // eslint-disable-next-line react/jsx-no-comment-textnodes
                }}>
                <Form>
                    <Row>
                        <Col md={6}>
                            {/* <Label htmlFor="firstName">First Name:</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={profile.firstName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Noah"
                                /> */}
                            <TextInputBootstrap
                                label="First Name"
                                name="firstName"
                                type="text"
                                placeholder="Noah"
                            />
                            <TextInputBootstrap
                                label="Last Name"
                                name="lastName"
                                type="text"
                                placeholder="Roerig"
                            />

                            <FormGroup row>
                                <Label sm={3}>Gender</Label>
                                <Col sm={4}>
                                    <MySelect name="gender" label="Gender">
                                        <option defaultChecked value="male">
                                            Male
                                        </option>
                                        <option value="female">Female</option>
                                    </MySelect>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Language</Label>
                                <Col sm={4}>
                                    <MySelect name="language" label="Language">
                                        <option defaultChecked value="english">
                                            English
                                        </option>
                                        <option value="spanish">Spanish</option>
                                        <option value="nigerian">Nigerian</option>
                                    </MySelect>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Graduation Term</Label>
                                <Col sm={4}>
                                    <MySelect name="graduationTerm" label="Graduation Term">
                                        <option defaultChecked value="fall2022">
                                            Fall 2022
                                        </option>
                                        <option value="spring2023">Spring 2023</option>
                                        <option value="fall2023">Fall 2023</option>
                                    </MySelect>
                                </Col>
                            </FormGroup>

                            <TextInputBootstrap label="Date of Birth" name="dob" type="date" />
                            <FormGroup row>
                                <Label sm={3}>Profile Visibility</Label>
                                <Col sm={4}>
                                    <MySelect name="visibility" label="Profile Visibility">
                                        <option value="open">Open</option>
                                        <option defaultChecked value="private">
                                            Private
                                        </option>
                                        <option value="closed">Closed</option>
                                    </MySelect>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Organizations</Label>
                                <Col sm={8}>
                                    <MySelect name="organization" label="Organizations">
                                        {organizationList.map((org, index) => (
                                            <option key={index} value={org.id}>
                                                {org.name}
                                            </option>
                                        ))}
                                    </MySelect>
                                    <FormText>
                                        Please select the organization your email belongs too.
                                    </FormText>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>

                    <button type="submit">Save</button>
                </Form>
            </Formik>

            {/* // ! REVISIT - property type doesn't exist on profile */}
            {/* <label>Profile Status: {profile.profileStatus}</label> */}
            {/* </form> */}
            {/* <button id="finishButton" onClick={handleFormSubmit}>
                Finish
            </button>
            <button id="skipButton" onClick={handleSkipSubmit}>
                Skip
            </button> */}
        </div>
    );
}
