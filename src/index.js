import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import PlayerLayout from './layouts/PlayerLayout';
import Auth from './layouts/Auth';
import Profile from './profile/Profile';
import Test from './Test';
import CreateProfile from './profile/CreateProfile';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-5p-an07k.us.auth0.com"
    clientId="fSMneHc4uoLgAmfFZA9WUyHWULdXku4O"
    redirectUri="http://localhost:3000/dashboard"
  >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route element={<Auth />}>
          <Route element={<PlayerLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

        </Route>
        <Route path='/createprofile' element={<CreateProfile />} />
        <Route path='/test' element={<Test />} />



      </Routes>
    </BrowserRouter>
  </Auth0Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
