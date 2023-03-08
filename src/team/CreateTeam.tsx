import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { apiCreateTeam } from "../common/api";
import { Sport, Visibility } from "../common/enums";
import useAxios from "../common/hooks/useAxios";
import { SelectInput, TextInput } from "../common/inputs";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { ITeam, ITeamNew } from "../interfaces/ITeam";

export default function CreateTeam() {
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(true);

    const navigate = useNavigate();
    const { postRequest } = useAxios();

    const handleSubmit = async (team: ITeamNew) => {
        setIsLoading(true);
        const response = await postRequest<ITeam, ITeamNew>("/api/team", team);
        if (isErrorResponse(response)) {
            setError(response.errorMessage);
            setIsLoading(false);
        }

        setIsSuccess(true);
        setIsLoading(false);
    };

    return (
        <div>
            <h1>Team Creator</h1>
            <hr />
            <Formik
                initialValues={{
                    name: "",
                    image: "",
                    visibility: Visibility.PRIVATE,
                    sport: Sport.SOCCER,
                }}
                onSubmit={(values: ITeamNew) => {
                    handleSubmit(values);
                }}>
                <Form>
                    <FormGroup row>
                        <Label for="name" sm={2}>
                            Name
                        </Label>
                        <Col sm={10}>
                            <TextInput id="name" name="name" placeholder="Team Name" type="text" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="image" sm={2}>
                            File
                        </Label>
                        <Col sm={10}>
                            <TextInput id="image" name="image" type="file" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="visibility" sm={2}>
                            Visibility
                        </Label>
                        <Col sm={10}>
                            <SelectInput id="visibility" name="visibility">
                                <option value={Visibility.CLOSED}>Closed</option>
                                <option value={Visibility.OPEN}>Open</option>
                                <option defaultChecked value={Visibility.PRIVATE}>
                                    Private
                                </option>
                            </SelectInput>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="sport" sm={2}>
                            Visibility
                        </Label>
                        <Col sm={10}>
                            <SelectInput id="sport" name="sport">
                                <option> </option>
                                <option value="SOCCER">Soccer</option>
                                <option value="BASKETBALL">Basketball</option>
                            </SelectInput>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col>
                            <Button type="submit">Create</Button>
                        </Col>

                        <Col sm={10}>
                            <p>{error}</p>
                            <p>{isSuccess && "Team Created!"}</p>
                        </Col>
                    </FormGroup>
                </Form>
            </Formik>
        </div>
    );
}
