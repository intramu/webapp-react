import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AxiosTokenInitializer } from "./AxiosTokenInitializer";

// type AuthProviderProps = (
//     appState?: AppState | undefined,
//     user?: User | undefined
// ) => void | undefined;

/**
 * Creates Auth0Provider wrapper for application while initializing token for axios
 * @returns
 */
export function AuthProvider() {
    const navigate = useNavigate();

    // cant figure out typing for this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                redirect_uri: "http://localhost:5173/redirect",
                scope: "all:application all:organization openid email profile",
            }}>
            <>
                <AxiosTokenInitializer />
                <Outlet />
            </>
        </Auth0Provider>
    );
}
