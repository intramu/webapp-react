import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import PlayerLayout from "./layouts/PlayerLayout";
import TeamLayout from "./layouts/TeamLayout";
import Dashboard from "./pages/Dashboard";
import OneTeam from "./pages/teams/[teamId]";
import NewTeam from "./pages/teams/newTeam";
import ProfileSettings from "./pages/profile";
import Help from "./pages/Help";
import AuthPlayer from "./layouts/AuthPlayer";

import OnePlayer from "./pages/players/[userId]";
import Home from "./pages/landing/home";
import LandingLayout from "./layouts/LandingLayout";
import Holder from "./pages/holder";
import { Network } from "./pages/network";

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
        <BrowserRouter>
            <Routes>
                <Route element={<AuthPlayer />}>
                    <Route element={<PlayerLayout />}>
                        {/* Sidebar routes */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/test" element={<Holder />} />
                        <Route path="teams" element={<TeamLayout />}>
                            <Route path=":teamId" element={<OneTeam />} />
                            <Route path="new" element={<NewTeam />} />
                        </Route>
                        <Route path="/network" element={<Network />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/profile" element={<ProfileSettings />} />
                        <Route path="/players/:userId" element={<OnePlayer />} />
                    </Route>
                </Route>
                <Route element={<LandingLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>

                {/* <Route path="/landing/test.html" /> */}
                {/* <Route path="/test" element={<Navigate to={"/landing/test.html"} /> */}
            </Routes>
        </BrowserRouter>
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
