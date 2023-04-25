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
    const { VITE_AUDIENCE, VITE_CLIENT_ID, VITE_DOMAIN, VITE_REDIRECT_URI, VITE_SCOPE } =
        import.meta.env;

    // cant figure out typing for this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onRedirectCallback = (appState: any) => {
        navigate(appState && appState.returnTo ? appState.returnTo : window.location.href);
    };

    return (
        <Auth0Provider
            domain={VITE_DOMAIN}
            clientId={VITE_CLIENT_ID}
            onRedirectCallback={onRedirectCallback}
            authorizationParams={{
                audience: VITE_AUDIENCE,
                redirect_uri: VITE_REDIRECT_URI,
                scope: VITE_SCOPE,
            }}>
            <>
                <AxiosTokenInitializer />
                <Outlet />
            </>
        </Auth0Provider>
    );
}
