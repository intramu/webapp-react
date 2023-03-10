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

function Profile() {
    const [player, setPlayer] = useState<IPlayer>(initialState);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>();

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
        <div>
            <h5>
                <u>Profile</u>
            </h5>
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
                    <Form style={{ width: "50%" }}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <TextInput label="First Name" name="firstName" type="text" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Last Name</Label>
                                    <TextInput label="Last Name" name="lastName" type="text" />
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
                                    <button style={{ width: "100%" }}>Change Image</button>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Email Address</Label>

                                    <TextInput label="Email" name="emailAddress" type="text" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Gender</Label>
                                    <SelectInput label="Gender" name="gender">
                                        <option value="MALE">Male</option>
                                        <option defaultChecked value="FEMALE">
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
                                    <SelectInput label="Language" name="language">
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
                                <SelectInput label="Visibility" name="visibility">
                                    <option value="PRIVATE">Private</option>
                                    <option defaultChecked value="OPEN">
                                        Open
                                    </option>
                                    <option value="CLOSED">Closed</option>
                                </SelectInput>
                            </Col>
                        </FormGroup>
                        <Button type="submit">Update</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Profile;
