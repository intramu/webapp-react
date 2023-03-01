import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import PlayerLayout from "./layouts/PlayerLayout";
import TeamLayout from "./layouts/TeamLayout";
import AuthPlayer from "./layouts/AuthPlayer";
import Test from "./Test";
import CreateProfile from "./profile/CreateProfile";
import Team from "./team/Team";
import CreateTeam from "./team/CreateTeam";
import UpdateTeam from "./team/UpdateTeam";
import Error404 from "./Error404";
import AuthAdmin from "./layouts/AuthAdmin";
import Home from "./admin/Home";
import AdminLayout from "./layouts/AdminLayout";
import CompetitionCreator from "./admin/CompetitionCreator/CompetitionCreator";
import Fake from "./admin/Fake";
import SettingsLayout from "./settings/SettingsLayout";
import Discover from "./discover/Discover";
import NewTeam from "./team/NewTeam";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    // <React.StrictMode>
    <Auth0Provider
        domain="dev-5p-an07k.us.auth0.com"
        clientId="fSMneHc4uoLgAmfFZA9WUyHWULdXku4O"
        redirectUri="http://localhost:3000/dashboard"
        audience="https://server-authorization/">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route element={<AuthPlayer />}>
                    <Route element={<PlayerLayout />}>
                        <Route path="/createprofile" element={<CreateProfile />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/settings" element={<SettingsLayout />} />
                        <Route path="team" element={<TeamLayout />}>
                            <Route index element={<NewTeam />} />
                            <Route path="create" element={<CreateTeam />} />
                            <Route path="update" element={<UpdateTeam />} />
                        </Route>
                        <Route path="/administration" element={<Fake />} />
                    </Route>
                </Route>
                <Route element={<AuthAdmin />}>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route index element={<Home />} />
                        <Route path="competition-creator" element={<CompetitionCreator />} />
                    </Route>
                </Route>

                <Route path="/test" element={<Test />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    </Auth0Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
