/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Button, Col, FormGroup, Label, Row } from "reactstrap";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { SelectInput, TextInput } from "../../common/inputs";
import { dynamicButton } from "../../styles/player/buttons";
import { PlayerModel } from "../../models/PlayerModel";
import { Language, PlayerGender, PlayerVisibility } from "../../utilities/enums/userEnum";
import { userRootStore } from "../../pages/_routes";
import { GreyButton } from "../Buttons";

export const Profile = observer(() => {
    const { player } = userRootStore;
    const { editPlayer } = player;

    const [isEditing, setIsEditing] = useState(false);

    // useEffect(() => {
    //     fetchPlayer();
    // }, [fetchPlayer]);

    const convertDate = (date: string): string => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("sv-SE");
    };

    if (player.state === "pending") {
        return <div>Loading...</div>;
    }
    if (player.error) {
        return <div>Error sorry :(</div>;
    }

    return (
        <>
            <h5>
                <u>Profile</u>
            </h5>
            <GreyButton onClick={() => setIsEditing((x) => !x)}>
                {isEditing ? "Cancel" : "Edit"}
            </GreyButton>

            <Formik
                enableReinitialize
                initialValues={player}
                validationSchema={Yup.object({
                    emailAddress: Yup.string().email("Invalid emailAddress"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    editPlayer(values);
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
                                        disabled={!isEditing || formik.isSubmitting}
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
                                        disabled={!isEditing || formik.isSubmitting}
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
                                        disabled={!isEditing || formik.isSubmitting}>
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
                                        disabled={!isEditing || formik.isSubmitting}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Gender</Label>
                                    <SelectInput
                                        label="Gender"
                                        name="gender"
                                        disabled={!isEditing || formik.isSubmitting}>
                                        <option value={PlayerGender.MALE}>Male</option>
                                        <option defaultChecked value={PlayerGender.FEMALE}>
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
                                        disabled={!isEditing || formik.isSubmitting}>
                                        <option value={Language.ENGLISH}>English</option>
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
                                    disabled={!isEditing || formik.isSubmitting}>
                                    <option value={PlayerVisibility.PRIVATE}>Private</option>
                                    <option value={PlayerVisibility.OPEN}>Open</option>
                                    <option value={PlayerVisibility.CLOSED}>Closed</option>
                                </SelectInput>
                            </Col>
                        </FormGroup>
                        <Button disabled={!isEditing} type="submit">
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
});
