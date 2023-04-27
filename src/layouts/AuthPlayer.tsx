import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { newGetRequest } from "../common/functions/axiosRequests";
import { IPlayer } from "../interfaces/IPlayer";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { Loader } from "../components/Loader";

/** Performs authentication on players trying to enter application */
export function AuthPlayer() {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(import.meta.env);

    // auth0 variables
    const { isAuthenticated, loginWithRedirect, isLoading, error } = useAuth0();

    // is current user a player
    // const [isPlayer, setIsPlayer] = useState(true);
    // const [isClaimsLoading, setIsClaimsLoading] = useState(false);
    const [isStatusLoading, setIsStatusLoading] = useState(false);

    // role claims from auth0
    // const roleClaimType = import.meta.env.VITE_ROLE_CLAIMS_URL;

    /**
     * Redirects user to finish profile if they're not found in database
     * Will not redirect on network error
     */
    useEffect(() => {
        const fetch = async () => {
            setIsStatusLoading(true);
            const response = await newGetRequest<IPlayer>("/players");
            if (isErrorResponse(response)) {
                // not found
                if (response.statusCode === 404) {
                    navigate("/finish-profile");
                }
            }
            setIsStatusLoading(false);
        };
        // only runs once auth0 has authenticated user, stopped loading, and user
        // isn't already at finish-profile route
        if (!isLoading && isAuthenticated && location.pathname !== "/finish-profile") {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isLoading]);

    /** NEED TO REVISIT */
    /** Checks if current user's role is a player */
    // useEffect(() => {
    //     // TODO: remove sudo in production
    //     const authorizedRoles = ["Player", "Sudo"];

    //     const check = async () => {
    //         const claims = await getIdTokenClaims();
    //         if (claims) {
    //             // checks if user claims contains authorized role
    //             const roles: string[] = claims[roleClaimType];
    //             const authorize = authorizedRoles.some((role) => roles.includes(role));

    //             if (authorize) {
    //                 setIsPlayer(true);
    //             }
    //         }

    //         setIsClaimsLoading(false);
    //     };

    //     // only check if user is available from auth0
    //     if (!isLoading) {
    //         check();
    //     }
    // }, [getIdTokenClaims, isLoading, roleClaimType]);

    if (error) {
        return <div>Well this is a weird error. Not sure what happened</div>;
    }

    if (isLoading || isStatusLoading) {
        return <Loader />;
    }

    // if user isn't authenticated with auth0, they're redirected to login page
    if (!isAuthenticated) {
        loginWithRedirect({
            appState: {
                returnTo: window.location.pathname,
            },
        });
        return <Loader />;
    }

    // if user is admin they cannot access dashboard
    // if (!isPlayer) {
    //     return (
    //         <div>
    //             <b>
    //                 Sorry, you cant access this page as an admin. If you wish to particpate please
    //                 create another account
    //             </b>
    //             <button onClick={() => navigate("/admin/portal")}>Back</button>
    //         </div>
    //     );
    // }

    return isAuthenticated && <Outlet />;
}
