import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Error404 from "../pages/Error404";

export function AuthAdmin() {
    const { getIdTokenClaims, error, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const roleClaimType = "https://intramu.app.com/roles";

    useEffect(() => {
        const authorizedRoles = ["Admin", "Sudo"];

        const fetch = async () => {
            setPageLoading(true);
            const claims = await getIdTokenClaims();

            if (!claims) {
                setIsAuthorized(false);
                setPageLoading(false);
                return;
            }

            const roles: string[] = claims[roleClaimType];
            const authorize = authorizedRoles.some((role) => roles.includes(role));

            if (!authorize) {
                setIsAuthorized(false);
                setPageLoading(false);
                return;
            }

            setIsAuthorized(true);
            setPageLoading(false);
        };
        fetch();
    }, [getIdTokenClaims]);

    if (error) {
        return <Error404 />;
    }

    if (isLoading || pageLoading) {
        return <b>Loading</b>;
    }

    if (!isAuthenticated) {
        loginWithRedirect({
            appState: {
                returnTo: window.location.pathname,
            },
        });
        return null;
    }

    // possibly show a 404 error if were trying to hide the existence of the admin page
    if (!isAuthorized) {
        return (
            <div>
                <b>Sorry you are not authorized to view this page</b>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        );
    }

    return isAuthenticated && isAuthorized && <Outlet />;
}
