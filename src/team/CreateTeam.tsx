import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { apiCreateTeam } from "../common/api";
import { Visibility } from "../common/enums";
import { MySelect, TextInputBootstrap } from "../common/inputs";

export default function CreateTeam() {
    const initialState = {
        name: "",
        image: "",
        visibility: "PRIVATE",
        sport: "",
        playerId: "",
    };

    const [team, setTeam] = useState(initialState);
    const [responseMessage, setResponseMessage] = useState("");
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await apiCreateTeam(token, values);
            if (response.data.code < 1) {
                setResponseMessage("Error creating team");
                console.log("Error creating team");
                return;
            }
        } catch (error) {
            console.log(error);
        }
        setResponseMessage("Team was created successfully");
        setTimeout(() => {
            navigate("/team");
        }, 2000);
    };

    return (
        <div>
            <h1>Team Creator</h1>
            <hr />
            <Formik
                initialValues={{
                    name: "",
                    image: "",
                    visibility: "",
                    sport: "",
                }}
                onSubmit={(values: any) => {
                    handleSubmit(values);
                }}>
                <Form>
                    <FormGroup row>
                        <Label for="name" sm={2}>
                            Name
                        </Label>
                        <Col sm={10}>
                            <TextInputBootstrap
                                id="name"
                                name="name"
                                placeholder="Team Name"
                                type="text"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="image" sm={2}>
                            File
                        </Label>
                        <Col sm={10}>
                            <TextInputBootstrap id="image" name="image" type="file" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="visibility" sm={2}>
                            Visibility
                        </Label>
                        <Col sm={10}>
                            <MySelect id="visibility" name="visibility">
                                <option value={Visibility.CLOSED}>Closed</option>
                                <option value={Visibility.OPEN}>Open</option>
                                <option defaultChecked value={Visibility.PRIVATE}>
                                    Private
                                </option>
                            </MySelect>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="sport" sm={2}>
                            Visibility
                        </Label>
                        <Col sm={10}>
                            <MySelect id="sport" name="sport">
                                <option> </option>
                                <option value="SOCCER">Soccer</option>
                                <option value="BASKETBALL">Basketball</option>
                            </MySelect>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col>
                            <Button type="submit">Create</Button>
                        </Col>

                        <Col sm={10}>
                            <p>{responseMessage}</p>
                        </Col>
                    </FormGroup>
                </Form>
            </Formik>
        </div>
    );
}
