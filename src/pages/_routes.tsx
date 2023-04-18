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

import { LandingLayout } from "../layouts/LandingLayout";
import { About } from "./landing/about";
import { Home } from "./landing/home";

import { UIStore } from "../models/stores/UIStore";
import { UserRootStore } from "../models/stores/user/UserRootStore";
import { OrganizationRootStore } from "../models/stores/admin/OrganizationRootStore";

import { Test } from "../Test";
import { Initializer } from "./_initializer";

import "../styles/globals.css";
import { ContestGame } from "./network/games/[id]";

export const uiStore = new UIStore();
export const organizationStore = new OrganizationRootStore();
export const userRootStore = new UserRootStore();

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />}>
            <Route element={<AuthPlayer />}>
                <Route element={<Initializer />}>
                    <Route element={<PlayerLayout />}>
                        <Route
                            path="/redirect"
                            element={<div style={{ backgroundColor: "red" }}>here loading</div>}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
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
                        <Route path="/test" element={<Test />} />
                    </Route>
                </Route>

                <Route path="finish-profile" element={<FinishProfile />} />
            </Route>
            <Route element={<AuthAdmin />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/portal" element={<Portal />} />
                    <Route path="/admin/competition-creator" element={<TempCompetitionCreator />} />
                    <Route path="/admin/settings" element={<Settings />} />
                    <Route path="/admin/players" element={<Players />} />
                    <Route path="/admin/teams" element={<Teams />} />
                </Route>
            </Route>

            <Route element={<LandingLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<div>Uh oh, couldnt find that</div>} />
        </Route>
    )
);
