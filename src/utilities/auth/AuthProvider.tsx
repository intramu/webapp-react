import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AxiosTokenInitializer } from "./AxiosTokenInitializer";

type AuthProviderProps = {
    appState?: {
        returnTo: string;
    };
};

export function AuthProvider() {
    const navigate = useNavigate();

    const onRedirectCallback = (appState: any) => {
        navigate(appState && appState.returnTo ? appState.returnTo : window.location.href);
    };

    return (
        <Auth0Provider
            domain="dev-5p-an07k.us.auth0.com"
            clientId="fSMneHc4uoLgAmfFZA9WUyHWULdXku4O"
            onRedirectCallback={onRedirectCallback}
            authorizationParams={{
                audience: "https://server-authorization/",
                redirect_uri: "http://localhost:3000/redirect",
                scope: "all:application all:organization",
            }}>
            <>
                <AxiosTokenInitializer />
                <Outlet />
            </>
        </Auth0Provider>
    );
}
