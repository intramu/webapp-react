import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Formik } from "formik";
import { Col, FormGroup, FormText, Label, Row } from "reactstrap";
import { SelectInput, TextInput } from "../common/inputs";
import { apiCreatePlayer, apiGetOrganizationList } from "../common/api";
import { Language, Status, Visibility } from "../common/enums";
// import { IsLoadingHOC } from "../common/hoc/IsLoadingHOC";

function CreateProfile(props: any) {
    const { getAccessTokenSilently } = useAuth0();
    const { setLoading } = props;
    const navigate = useNavigate();

    const [organizationList, setOrganizationList] = useState([{ id: "", name: "" }]);

    const handleFormSubmit = async (values: {
        firstName: string;
        lastName: string;
        gender: string;
        language: Language;
        graduationTerm: string;
        organizationId: string;
        dateOfBirth: string;
        visibility: Visibility;
        status: Status;
    }) => {
        // call the api endpoint that creates the player profile and assigns there auth0 id
        // to an organization

        setLoading(true);

        const token = await getAccessTokenSilently();
        const response = await apiCreatePlayer(token, values);
        if (response.status === 200) {
            navigate("/dashboard");
        }

        console.log(response.data);
        setLoading(false);
    };

    useEffect(() => {
        const getOrganizationList = async () => {
            const token = await getAccessTokenSilently();
            const response = await apiGetOrganizationList(token);

            setOrganizationList(response.data);
        };

        getOrganizationList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // todo: validation schema for this form
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
                    firstName: "",
                    lastName: "",
                    emailAddress: "",
                    gender: "MALE",
                    language: "ENGLISH",
                    graduationTerm: "",
                    organizationId: "",
                    dateOfBirth: "",
                    visibility: "PRIVATE",
                    status: "Incomplete",
                }}
                onSubmit={(values: any) => {
                    console.log(values);
                    handleFormSubmit(values);
                    // alert(values);
                    // eslint-disable-next-line react/jsx-no-comment-textnodes
                }}>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Label sm={3}>First Name</Label>
                            <TextInput
                                label="First Name"
                                name="firstName"
                                type="text"
                                placeholder="Noah"
                            />

                            <Label sm={3}>Last Name</Label>
                            <TextInput
                                label="Last Name"
                                name="lastName"
                                type="text"
                                placeholder="Roerig"
                            />

                            {/* Keep this for now. Will remove later by grabbing email from auth key */}
                            <Label sm={3}>Email Address</Label>
                            <TextInput
                                label="Email Address"
                                name="emailAddress"
                                type="text"
                                placeholder="...@my.gcu.edu"
                            />
                            <FormText>Same as the one you signed up with.</FormText>

                            <FormGroup row>
                                <Label sm={3}>Gender</Label>
                                <Col sm={4}>
                                    <SelectInput TextInput="gender" label="Gender">
                                        <option defaultChecked value="MALE">
                                            Male
                                        </option>
                                        <option value="FEMALE">Female</option>
                                    </SelectInput>
                                    TextInput{" "}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Language</Label>
                                <Col sm={4}>
                                    <SelectInput TextInput="language" label="Language">
                                        <option defaultChecked value="ENGLISH">
                                            English
                                        </option>
                                        <option value="SPANISH">Spanish</option>
                                        <option value="NIGERIAN">Nigerian</option>
                                    </SelectInput>
                                    TextInput{" "}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Graduation Term</Label>
                                <Col sm={4}>
                                    <SelectInput TextInput="graduationTerm" label="Graduation Term">
                                        <option defaultChecked value="fall2022">
                                            Fall 2022
                                        </option>
                                        <option value="SPRING-2023">Spring 2023</option>
                                        <option value="FALL-2023">Fall 2023</option>
                                        <option value="SPRING-2023">Spring 2023</option>
                                        <option value="FALL-2024">Fall 2024</option>
                                    </SelectInput>
                                    TextInput{" "}
                                </Col>
                            </FormGroup>

                            <Label sm={3}>Date of Birth</Label>
                            <TextInput label="Date of Birth" name="dateOfBirth" type="date" />
                            <FormGroup row>
                                <Label sm={3}>Profile Visibility</Label>
                                <Col sm={4}>
                                    <SelectInput TextInput="visibility" label="Profile Visibility">
                                        <option value="OPEN">Open</option>
                                        <option defaultChecked value="PRIVATE">
                                            Private
                                        </option>
                                        <option value="CLOSED">Closed</option>
                                    </SelectInput>
                                    TextInput{" "}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Organizations</Label>
                                <Col sm={8}>
                                    <SelectInput TextInput="organizationId" label="Organizations">
                                        <option defaultChecked> </option>
                                        {organizationList.map((org, index) => (
                                            <option key={index} value={org.id}>
                                                {org.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    TextInput{" "}
                                    <FormText>
                                        Please select the organization your email belongs too.
                                    </FormText>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>

                    <button type="submit">Save</button>
                    <button>
                        <Link to="/dashboard">Skip</Link>
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

// export default IsLoadingHOC(CreateProfile, "Please wait while he hit this nae nae");
export default CreateProfile;
