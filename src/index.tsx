import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlayerLayout from "./layouts/PlayerLayout";
import TeamLayout from "./layouts/TeamLayout";
import { Dashboard } from "./pages/dashboard";
import { OneTeam } from "./pages/teams/[teamId]";
import NewTeam from "./pages/teams/newTeam";
import ProfileSettings from "./pages/settings";
import AuthPlayer from "./layouts/AuthPlayer";

import OnePlayer from "./pages/players/[userId]";
import Home from "./pages/landing/home";
import LandingLayout from "./layouts/LandingLayout";
import Messages from "./pages/messages";
import { TestOneTeam } from "./pages/teams/testOneTeam";
import { TeamModel } from "./models/TeamModel";
import { Term } from "./pages/network/[term]";
import { Test } from "./Test";
import { Help } from "./pages/help";
import { AuthProvider } from "./utilities/auth/AuthProvider";
import { Setter } from "./utilities/auth/Setter";

const team = new TeamModel();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    // <React.StrictMode>
    // <Auth0Provider
    //     domain="dev-5p-an07k.us.auth0.com"
    //     clientId="fSMneHc4uoLgAmfFZA9WUyHWULdXku4O"
    //     redirectUri="http://localhost:3000/dashboard"
    //     audience="https://server-authorization/">
    // <BrowserRouter>
    // <Routes>
    // <Route path="/" element={<Landing />} />
    //             <Route element={<AuthPlayer />}>
    //                 <Route element={<PlayerLayout />}>
    //                     <Route path="/createprofile" element={<CreateProfile />} />
    //                     <Route path="/dashboard" element={<Dashboard />} />
    //                     <Route path="/discover" element={<Discover />} />
    //                     <Route path="/settings" element={<SettingsLayout />} />
    //                     <Route path="team" element={<TeamLayout />}>
    //                         <Route index element={<NewTeam />} />
    //                         <Route path="create" element={<CreateTeam />} />
    //                         <Route path="update" element={<UpdateTeam />} />
    //                     </Route>
    //                     <Route path="/administration" element={<Fake />} />
    //                 </Route>
    //             </Route>
    //             <Route element={<AuthAdmin />}>
    //                 <Route path="admin" element={<AdminLayout />}>
    //                     <Route index element={<Home />} />
    //                     <Route path="competition-creator" element={<CompetitionCreator />} />
    //                 </Route>
    //             </Route>

    //             <Route path="/test" element={<Test />} />
    //             <Route path="*" element={<Error404 />} />
    //         </Routes>
    //     </BrowserRouter>
    // </Auth0Provider>
    // </React.StrictMode>

    <Auth0Provider
        domain="dev-5p-an07k.us.auth0.com"
        clientId="fSMneHc4uoLgAmfFZA9WUyHWULdXku4O"
        redirectUri="http://localhost:3000/dashboard"
        audience="https://server-authorization/">
        {/* <AuthProvider> */}
        <Setter />
        <BrowserRouter>
            <Routes>
                <Route element={<AuthPlayer />}>
                    <Route element={<PlayerLayout />}>
                        {/* Sidebar routes */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="teams" element={<TeamLayout />}>
                            <Route path=":teamId" element={<OneTeam />} />
                            {/* <Route path=":teamId" element={<TestOneTeam store={team} />} /> */}
                            <Route path="new" element={<NewTeam />} />
                        </Route>
                        {/* <Route path="/network" element={<Network />} /> */}
                        <Route path="/network/:compId" element={<Term />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/profile" element={<ProfileSettings />} />
                        <Route path="/players/:userId" element={<OnePlayer />} />
                        <Route path="/test" element={<Test />} />
                    </Route>
                </Route>
                <Route element={<LandingLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>

                {/* <Route path="/landing/test.html" /> */}
                {/* <Route path="/test" element={<Navigate to={"/landing/test.html"} /> */}
            </Routes>
        </BrowserRouter>
        {/* </AuthProvider> */}
    </Auth0Provider>
);

/** This will fetch any requests when the app is first mounted and pass them to the message center.
 * This will removed in later version when push notifications are used
 */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
