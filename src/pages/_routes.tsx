import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthProvider } from "../utilities/auth/AuthProvider";
import { AuthPlayer } from "../layouts/AuthPlayer";
import { PlayerLayout } from "../layouts/PlayerLayout";
import { Dashboard } from "./dashboard";
import { Messages } from "./messages";
import { Help } from "./help";
import { ProfileSettings } from "./settings";
import { OnePlayer } from "./players/[userId]";
import { TeamLayout } from "../layouts/TeamLayout";
import { OneTeam } from "./teams/[teamId]";
import { NewTeam } from "./teams/newTeam";
import { FinishProfile } from "./finish-profile";
import { Fake } from "./Fake";
import { Term } from "./network/[term]";

import { AuthAdmin } from "../layouts/AuthAdmin";
import { AdminLayout } from "../layouts/AdminLayout";
import { Portal } from "./admin";
import { Settings } from "./admin/settings";
import { Players } from "./admin/players";
import { Teams } from "./admin/teams";
import TempCompetitionCreator from "./admin/competition-creator";

import { UIStore } from "../models/stores/UIStore";
import { UserRootStore } from "../models/stores/user/UserRootStore";
import { OrganizationRootStore } from "../models/stores/admin/OrganizationRootStore";

import { Initializer } from "./_initializer";

import "../styles/globals.css";
import { ContestGame } from "./network/games/[gameId]";
import { ScoreReporter } from "./admin/score-reporter";
import { Games } from "./admin/games";
import { Admins } from "./admin/admins";
//-------------------------------------------------------------------

/** route list for entire application */

// mobx data stores are initialized here and reused around application
export const uiStore = new UIStore();
export const organizationStore = new OrganizationRootStore();
export const userRootStore = new UserRootStore();

// exported browser router is used in index.tsx
export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />}>
            <Route element={<AuthPlayer />}>
                <Route element={<Initializer />}>
                    <Route
                        path="/redirect"
                        element={<div style={{ backgroundColor: "red" }}>here loading</div>}
                    />
                    <Route element={<PlayerLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/profile" element={<ProfileSettings />} />
                        <Route path="/players/:userId" element={<OnePlayer />} />
                        <Route path="teams" element={<TeamLayout />}>
                            <Route path=":teamId" element={<OneTeam />} />
                            <Route path="new" element={<NewTeam />} />
                        </Route>
                        <Route path="/network/:compId" element={<Term />} />
                        <Route path="/network/games/:compId" element={<ContestGame />} />
                        <Route path="/administration" element={<Fake />} />
                    </Route>
                </Route>

                <Route path="finish-profile" element={<FinishProfile />} />
            </Route>
            <Route element={<AuthAdmin />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/" element={<Portal />} />
                    <Route path="/admin/competition-creator" element={<TempCompetitionCreator />} />
                    <Route path="/admin/settings" element={<Settings />} />
                    <Route path="/admin/players" element={<Players />} />
                    <Route path="/admin/teams" element={<Teams />} />
                    <Route path="/admin/score-reporter" element={<ScoreReporter />} />
                    <Route path="/admin/admins" element={<Admins />} />
                    <Route path="/admin/games" element={<Games />} />
                </Route>
            </Route>

            <Route path="*" element={<div>Uh oh, couldnt find that</div>} />
        </Route>
    )
);
