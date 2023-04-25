import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Error404 from "../pages/Error404";

/** Performs authentication on admins trying to enter application */
export function AuthAdmin() {
    const navigate = useNavigate();

    // auth0 variables
    const { getIdTokenClaims, error, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

    // is current user an admin
    const [isAdmin, setIsAdmin] = useState(false);
    const [isClaimsLoading, setIsClaimsLoading] = useState(true);

    // role claims from auth0
    const roleClaimType = import.meta.env.VITE_ROLE_CLAIMS_URL;

    /** Checks if current user's role is an admin */
    useEffect(() => {
        const authorizedRoles = ["Admin", "Sudo"];

        const check = async () => {
            const claims = await getIdTokenClaims();
            if (claims) {
                // checks if user claims contains authorized role
                const roles: string[] = claims[roleClaimType];
                const authorize = authorizedRoles.some((role) => roles.includes(role));

                if (authorize) {
                    setIsAdmin(true);
                }
            }

            setIsClaimsLoading(false);
        };

        // only check if user is available from auth0
        if (!isLoading) {
            check();
        }
    }, [getIdTokenClaims, isLoading, roleClaimType]);

    if (error) {
        return <Error404 />;
    }

    if (isLoading || isClaimsLoading) {
        return <b>Loading</b>;
    }

    // if user isn't authenticated with auth0, they're redirected to login page
    if (!isAuthenticated) {
        loginWithRedirect({
            appState: {
                returnTo: window.location.pathname,
            },
        });
        return null;
    }

    // possibly show a 404 error if were trying to hide the existence of the admin page
    // if user isn't an admin they cannot access admin portal
    if (!isAdmin) {
        return (
            <div>
                <b>Sorry you are not authorized to view this page</b>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        );
    }

    return isAuthenticated && isAdmin && <Outlet />;
}
