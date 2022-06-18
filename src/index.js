import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Landing from './Landing';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import PlayerLayout from './layouts/PlayerLayout';
import TeamLayout from './layouts/TeamLayout';
import Auth from './layouts/Auth';
import Profile from './profile/Profile';
import Test from './Test';
import CreateProfile from './profile/CreateProfile';
import Team from './team/Team';
import Network from './team/Network';
import CreateTeam from './team/CreateTeam';
import UpdateTeam from './team/UpdateTeam';
import withFetch from './common/withFetch';
import Todos from './common/Todos';

const TodosWithFetch = withFetch(
    Todos
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Auth0Provider
        domain="dev-5p-an07k.us.auth0.com"
        clientId="fSMneHc4uoLgAmfFZA9WUyHWULdXku4O"
        redirectUri="http://localhost:3000/dashboard"
        audience='https://server-authorization/'
    >
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/todos' element={<TodosWithFetch />} />
                <Route element={<Auth />}>
                    <Route element={<PlayerLayout />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/network' element={<Network />} />

                        <Route path='team' element={<TeamLayout />}>
                            <Route index element={<Team />} />

                            <Route path='create' element={<CreateTeam />} />
                            <Route path='update' element={<UpdateTeam />} />
                        </Route>

                    </Route>

                </Route>
                <Route path='/createprofile' element={<CreateProfile />} />
                <Route path='/test' element={<Test />} />
                <Route path='*' element={<main><p>There's nothing at this route. Sorry!</p></main>} />

            </Routes>
        </BrowserRouter>
    </Auth0Provider >
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
