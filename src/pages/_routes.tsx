import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthPlayer } from "../layouts/AuthPlayer";
import { Dashboard } from "./dashboard";
import { AuthProvider } from "../utilities/auth/AuthProvider";
import { PlayerLayout } from "../layouts/PlayerLayout";
import { Messages } from "./messages";
import { Help } from "./help";
import { ProfileSettings } from "./settings";
import { OnePlayer } from "./players/[userId]";
import { TeamLayout } from "../layouts/TeamLayout";
import { OneTeam } from "./teams/[teamId]";
import { NewTeam } from "./teams/newTeam";
import { FinishProfile } from "./finish-profile";
import { AuthAdmin } from "../layouts/AuthAdmin";
import { Portal } from "./admin";
import { LandingLayout } from "../layouts/LandingLayout";
import { Home } from "./landing/home";
import { Fake } from "./Fake";

import { AdminLayout } from "../layouts/AdminLayout";

import "../styles/globals.css";
import TempCompetitionCreator from "./admin/competition-creator";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />}>
            <Route element={<AuthPlayer />}>
                <Route element={<PlayerLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/profile" element={<ProfileSettings />} />
                    <Route path="/players/:userId" element={<OnePlayer />} />
                    <Route path="teams" element={<TeamLayout />}>
                        <Route path=":teamId" element={<OneTeam />} />
                        <Route path="new" element={<NewTeam />} />
                    </Route>
                    <Route path="/administration" element={<Fake />} />
                </Route>

                <Route path="finish-profile" element={<FinishProfile />} />
            </Route>
            <Route element={<AuthAdmin />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/portal" element={<Portal />} />
                    <Route path="/admin/competition-creator" element={<TempCompetitionCreator />} />
                </Route>
            </Route>

            <Route element={<LandingLayout />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<div>Uh oh, couldnt find that</div>} />
        </Route>
    )
);
