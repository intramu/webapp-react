import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Grid, MenuItem } from "@mui/material";
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
import { CreateTeamProps } from "../../models/stores/TeamStore";
import { GreyButton } from "../../components/Buttons";

/** Form for creating new team  */
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

    // useEffect(() => {
    //     createTeamState = "pending";
    // }, []);

    // NOTE: maybe when the team is successfully created, play some animation
    // then redirect
    const handleSubmit = async (team: CreateTeamProps) => {
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
            initialValues={{
                name: "",
                image: "",
                contest: "",
                league: "",
                division: "",
                visibility: TeamVisibility.PRIVATE,
            }}
            onSubmit={(values) => {
                handleSubmit({
                    name: values.name,
                    image: "",
                    contest: Number(values.contest),
                    league: Number(values.league),
                    divisionId: Number(values.division),
                    visibility: values.visibility,
                });
            }}>
            {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} columns={6}>
                        <Grid item xs={6}>
                            <MaterialTextInput name="name" label="Name" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput name="image" type="file" />
                        </Grid>
                        <Grid item xs={6}>
                            <MaterialSelectInput
                                name="visibility"
                                label="Visibility"
                                enumValue={TeamVisibility}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <MaterialExperimentInput
                                name="contest"
                                label="Contest"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    formik.handleChange(e);
                                    updateLeagues(Number(e.target.value));
                                }}>
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
                                disabled={!formik.values.contest}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    formik.handleChange(e);
                                    updateDivisions(Number(e.target.value));
                                }}>
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
                                name="division"
                                label="Division"
                                disabled={!formik.values.league}>
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
                            <GreyButton type="submit">Create</GreyButton>
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
