import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Grid, MenuItem } from "@mui/material";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {
    MaterialExperimentInput,
    MaterialSelectInput,
    MaterialTextInput,
    TextInput,
} from "../../common/inputs";
import { fullDynamic } from "../../styles/player/containers";
import { TeamVisibility } from "../../utilities/enums/teamEnum";
import { userRootStore } from "../_routes";
import { LeagueModel } from "../../models/contests/LeagueModel";
import { DivisionModel } from "../../models/contests/DivisionModel";
import { newTeamSchema } from "../../utilities/formValidation/teamValidation";

/** Form for creating new team  */

interface FormValues {
    name: string;
    image: string;
    contest: number;
    league: number;
    divisionId: number;
    visibility?: TeamVisibility;
}
export const NewTeam = observer(() => {
    const {
        contestStore: { contests },
        teamStore: { createTeam, createTeamError, createTeamState, teams },
    } = userRootStore;

    const [divisions, setDivisions] = useState<DivisionModel[]>([]);
    const [leagues, setLeagues] = useState<LeagueModel[]>([]);

    const navigate = useNavigate();

    // updates league list when new contest is chosen in form
    const updateLeagues = (contestId: number) => {
        setLeagues(
            contests.find((contest) => contest.id === contestId)?.leagues.map((league) => league) ??
                []
        );
        setDivisions([]);
    };

    // updates division list when new league is chosen in form
    const updateDivisions = (leagueId: number) => {
        setDivisions(
            leagues
                .find((league) => league.id === leagueId)
                ?.divisions.map((division) => division) ?? []
        );
    };

    // NOTE: maybe when the team is successfully created, play some animation
    // then redirect
    const handleSubmit = async (team: FormValues) => {
        createTeam(team);
        setTimeout(() => {
            if (!createTeamError && createTeamState === "success") {
                const newestTeam = teams.splice(-1).pop();
                // checks to see if team exists before redirecting to team page
                if (!newestTeam) {
                    navigate(`/dashboard`);
                    return;
                }
                navigate(`/teams/${newestTeam.id}`);
            }
        }, 1000);
    };

    const form = (
        <Formik
            enableReinitialize
            initialValues={{
                name: "",
                image: "",
                contest: 0,
                league: 0,
                divisionId: 0,
                visibility: undefined,
            }}
            validationSchema={newTeamSchema}
            onSubmit={(values: FormValues, { setSubmitting }) => {
                setTimeout(() => {
                    handleSubmit(values);
                    setSubmitting(false);
                }, 1000);
            }}>
            {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} columns={6}>
                        <Grid item xs={6}>
                            <MaterialTextInput
                                name="name"
                                label="Name"
                                disabled={formik.isSubmitting}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput name="image" type="file" disabled={formik.isSubmitting} />
                        </Grid>
                        <Grid item xs={6}>
                            <MaterialSelectInput
                                name="visibility"
                                label="Visibility"
                                disabled={formik.isSubmitting}
                                enumValue={TeamVisibility}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <MaterialExperimentInput
                                name="contest"
                                label="Contest"
                                disabled={formik.isSubmitting}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    formik.handleChange(e);
                                    updateLeagues(Number(e.target.value));
                                }}>
                                <MenuItem value={0}>Select Contest</MenuItem>
                                {/* Gives contest choices if organization offers more than one */}
                                {contests.map((contest) => {
                                    if (contest.season)
                                        return (
                                            <MenuItem key={contest.season} value={contest.id}>
                                                {contest.season}--{contest.term}
                                            </MenuItem>
                                        );
                                    return (
                                        <MenuItem key={contest.name} value={contest.id}>
                                            {contest.name}
                                        </MenuItem>
                                    );
                                })}
                            </MaterialExperimentInput>
                        </Grid>
                        <Grid item xs={4}>
                            <MaterialExperimentInput
                                name="league"
                                label="League"
                                disabled={!formik.values.contest || formik.isSubmitting}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    formik.handleChange(e);
                                    updateDivisions(Number(e.target.value));
                                }}>
                                <MenuItem value={0}>Select League</MenuItem>
                                {/* Gives contest choices if organization offers more than one */}
                                {leagues.map((league, index) => {
                                    return (
                                        <MenuItem key={index} value={league.id}>
                                            {league.sport}
                                        </MenuItem>
                                    );
                                })}
                            </MaterialExperimentInput>
                        </Grid>
                        <Grid item xs={4}>
                            <MaterialExperimentInput
                                name="divisionId"
                                label="Division"
                                disabled={!formik.values.league || formik.isSubmitting}>
                                <MenuItem value={0}>Select Division</MenuItem>
                                {/* Gives contest choices if organization offers more than one */}
                                {divisions.map((division, index) => {
                                    return (
                                        <MenuItem key={index} value={division.id}>
                                            {`${division.type} - ${division.level}`}
                                        </MenuItem>
                                    );
                                })}
                            </MaterialExperimentInput>
                        </Grid>
                        <Grid item xs={3}>
                            <Button disabled={!(formik.dirty && formik.isValid)} type="submit">
                                Create
                            </Button>
                            {createTeamState === "pending" && formik.isSubmitting && (
                                <b>Loading...</b>
                            )}
                            {createTeamError && <b>Error please try again another time</b>}
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
    return (
        <>
            <Helmet>
                <title>New Team</title>
            </Helmet>
            <div css={fullDynamic}>{form}</div>
        </>
    );
});
