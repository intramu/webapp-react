/** @jsxImportSource @emotion/react */
import { Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Label } from "reactstrap";
import useAxios from "../../common/hooks/useAxios";
import useSWR from "../../common/hooks/useSWR";
import { SelectInput, TextInput } from "../../common/inputs";
import { IContest } from "../../interfaces/competition/IContest";
import { IDivision } from "../../interfaces/competition/IDivision";
import { ILeague } from "../../interfaces/competition/ILeague";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { ITeam } from "../../interfaces/ITeam";
import { fullDynamic } from "../../styles/scss/player/containers";
import { TeamVisibility } from "../../utilities/enums/teamEnum";

interface INewTeam {
    name: string;
    // image: string;
    visibility: TeamVisibility;
    divisionId: number;
}

export function NewTeam() {
    const location = useLocation();
    const { postRequest } = useAxios();

    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const [divisions, setDivisions] = useState<IDivision[]>([]);
    const [leagues, setLeagues] = useState<ILeague[]>([]);

    const {
        data: contests = [],
        error: fetchError,
        isLoading: fetchIsLoading,
    } = useSWR<IContest[]>("contests");

    console.log(contests);

    const navigate = useNavigate();

    const updateLeagues = (contestId: number) => {
        setLeagues(
            contests.find((contest) => contest.id === contestId)?.leagues.map((league) => league) ??
                []
        );
        setDivisions([]);
    };

    const updateDivisions = (leagueId: number) => {
        setDivisions(
            leagues
                .find((league) => league.id === leagueId)
                ?.divisions.map((division) => division) ?? []
        );
    };

    // NOTE: maybe when the team is successfully created, play some animation
    // then redirect
    const handleSubmit = async (team: INewTeam) => {
        console.log(team);

        setIsLoading(true);
        const response = await postRequest<ITeam, INewTeam>("teams", team);
        if (isErrorResponse(response)) {
            console.log(response.errorMessage);

            setError(response.errorMessage);
            setIsLoading(false);
            return;
        }

        setIsSuccess(true);
        setIsLoading(false);

        navigate(`/teams/${response.id}`);
    };
    return (
        <>
            <Helmet>
                <title>New Team</title>
            </Helmet>
            <h1>New Team</h1>
            <div css={fullDynamic}>
                <Formik
                    initialValues={{
                        name: "",
                        image: "",
                        contest: "",
                        league: "",
                        division: "",
                        visibility: TeamVisibility.PRIVATE,
                    }}
                    onSubmit={(values) => {
                        console.log("nice day", values);

                        handleSubmit({
                            name: values.name,
                            // image: "",
                            divisionId: Number(values.division),
                            visibility: values.visibility,
                        });
                    }}>
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup row>
                                <Label for="name" sm={2}>
                                    Name
                                </Label>
                                <Col sm={10}>
                                    SelectInput
                                    <TextInput
                                        id="name"
                                        name="name"
                                        placeholder="Team Name"
                                        type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="image" sm={2}>
                                    Image
                                </Label>
                                <Col sm={10}>
                                    SelectInput
                                    <TextInput id="image" name="image" type="file" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="visibility" sm={2}>
                                    Visibility
                                </Label>
                                <Col sm={10}>
                                    <SelectInput id="visibility" name="visibility">
                                        <option value={TeamVisibility.PUBLIC}>Public</option>
                                        <option defaultChecked value={TeamVisibility.PRIVATE}>
                                            Private
                                        </option>
                                    </SelectInput>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="sport" sm={2}>
                                    Contest
                                </Label>
                                <Col sm={10}>
                                    <SelectInput
                                        id="contest"
                                        name="contest"
                                        onChange={(e: any) => {
                                            // I couldn't find the type for the select event so it is any for now
                                            formik.handleChange(e);
                                            updateLeagues(Number(e.target.value));
                                        }}>
                                        <option value="" defaultChecked>
                                            {" "}
                                        </option>
                                        {/* Gives contest choices if organization offers more than one */}
                                        {contests.map((contest) => {
                                            if (contest.season)
                                                return (
                                                    <option key={contest.season} value={contest.id}>
                                                        {contest.season}--{contest.term}
                                                    </option>
                                                );
                                            return (
                                                <option key={contest.name} value={contest.id}>
                                                    {contest.name}
                                                </option>
                                            );
                                        })}
                                    </SelectInput>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="sport" sm={2}>
                                    League
                                </Label>
                                <Col sm={10}>
                                    <SelectInput
                                        id="league"
                                        name="league"
                                        disabled={!formik.values.contest}
                                        onChange={(e: any) => {
                                            formik.handleChange(e);
                                            updateDivisions(Number(e.target.value));
                                        }}>
                                        <option value="" defaultChecked>
                                            {" "}
                                        </option>
                                        {/* Maps out leagues into sport choices */}
                                        {leagues.map((league, index) => (
                                            <option key={index} value={league.id}>
                                                {league.sport}
                                            </option>
                                        ))}
                                    </SelectInput>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="sport" sm={2}>
                                    Division
                                </Label>
                                <Col sm={10}>
                                    <SelectInput
                                        id="division"
                                        name="division"
                                        disabled={!formik.values.league}>
                                        <option value="" defaultChecked>
                                            {" "}
                                        </option>
                                        {/* Maps out divisions for user */}
                                        {divisions.map((division, index) => (
                                            <option key={index} value={division.id}>
                                                {`${division.type} - ${division.level}`}
                                            </option>
                                        ))}
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
                    )}
                </Formik>
            </div>
        </>
    );
}
