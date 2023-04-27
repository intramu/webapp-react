import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import { TeamModel } from "../../../models/team/TeamModel";
import { newGetRequest, newPostRequest } from "../../../common/functions/axiosRequests";
import { LocationModel } from "../../../models/LocationModel";
import {
    MaterialExperimentInput,
    MaterialStaticDateTimePicker,
    MaterialTextInput,
} from "../../../common/inputs";
import { isErrorResponse } from "../../../interfaces/ErrorResponse";
import { ContestGameModel } from "../../../models/contests/ContestGameModel";
import { INewContestGame } from "../../../interfaces/competition/IContestGame";
import { ContestModel } from "../../../models/contests/ContestModel";

interface LocationChoice {
    id: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    name: string;
    details: string;
    isMain: boolean;
}

export function GameCreator() {
    const [locations, setLocations] = useState<LocationChoice[]>([new LocationModel()]);
    const [teams, setTeams] = useState<TeamModel[]>([]);
    const [contests, setContests] = useState<ContestModel[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const locationResponse = newGetRequest<LocationChoice[]>("/organization/locations");
            const teamResponse = newGetRequest<TeamModel[]>("/organization/teams");
            const contestResponse = newGetRequest<ContestModel[]>("/contests/");

            const results = await Promise.all([locationResponse, teamResponse, contestResponse]);

            if (isErrorResponse(results[0])) {
                return;
            }

            if (isErrorResponse(results[1])) {
                return;
            }

            if (isErrorResponse(results[2])) {
                return;
            }

            setLocations(results[0]);
            setTeams(results[1]);
            setContests(results[2]);
        };
        fetch();
    }, []);

    return (
        <Formik
            initialValues={{
                gameDate: null,
                notes: "",
                location: 0,
                homeTeam: 0,
                awayTeam: 0,
                bracket: 0,
            }}
            onSubmit={async (values: INewContestGame, { setSubmitting }) => {
                setTimeout(async () => {
                    const response = await newPostRequest<ContestGameModel, INewContestGame>(
                        `/brackets/${values.bracket}/contests/games`,
                        values
                    );
                    if (isErrorResponse(response)) {
                        return;
                    }
                    setSubmitting(false);
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                }, 1000);
            }}>
            {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <MaterialExperimentInput label="Bracket" name="bracket">
                                        <MenuItem value={0}>Select Bracket</MenuItem>
                                        {contests.map((contest) => {
                                            return contest.leagues.map((league) => {
                                                return league.divisions.map((division) => {
                                                    return division.brackets.map((bracket) => {
                                                        if (bracket.maxTeamAmount === 0) {
                                                            return null;
                                                        }
                                                        return (
                                                            <MenuItem
                                                                key={bracket.id}
                                                                value={bracket.id}>
                                                                {league.sport} - {division.type}{" "}
                                                                {division.level} :{" "}
                                                                {bracket.dayChoices}
                                                                {bracket.timeChoices}
                                                            </MenuItem>
                                                        );
                                                    });
                                                });
                                            });
                                        })}
                                    </MaterialExperimentInput>
                                </Grid>
                                <Grid item xs={12}>
                                    <MaterialExperimentInput
                                        label="Location"
                                        name="location"
                                        disabled={formik.isSubmitting}>
                                        <MenuItem defaultValue={0} value={0}>
                                            Select Location
                                        </MenuItem>
                                        {locations.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name} {option.address}
                                            </MenuItem>
                                        ))}
                                    </MaterialExperimentInput>
                                </Grid>

                                <Grid item xs={12}>
                                    <MaterialExperimentInput
                                        label="Home Team"
                                        name="homeTeam"
                                        disabled={formik.isSubmitting}>
                                        <MenuItem defaultValue={0} value={0}>
                                            Select Team
                                        </MenuItem>
                                        {teams.map((option) => (
                                            <MenuItem
                                                disabled={option.id === formik.values.awayTeam}
                                                key={option.id}
                                                value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </MaterialExperimentInput>
                                </Grid>
                                <Grid item xs={12}>
                                    <MaterialExperimentInput
                                        label="Away Team"
                                        name="awayTeam"
                                        disabled={formik.isSubmitting}>
                                        <MenuItem defaultValue={0} value={0}>
                                            Select Team
                                        </MenuItem>
                                        {teams.map((option) => (
                                            <MenuItem
                                                disabled={option.id === formik.values.homeTeam}
                                                key={option.id}
                                                value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </MaterialExperimentInput>
                                </Grid>
                                <Grid item xs={12}>
                                    <MaterialTextInput
                                        label="Optional: Notes"
                                        name="notes"
                                        disabled={formik.isSubmitting}
                                        multiline
                                        rows={5}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <MaterialStaticDateTimePicker
                                setFieldValue={formik.setFieldValue}
                                name="gameDate"
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit">Create Game</Button>
                </Form>
            )}
        </Formik>
    );
}
