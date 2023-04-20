import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { newGetRequest } from "../common/functions/axiosRequests";
import { IPlayer } from "../interfaces/IPlayer";
import { isErrorResponse } from "../interfaces/ErrorResponse";

export function AuthPlayer() {
    const { isAuthenticated, loginWithRedirect, isLoading, error, getIdTokenClaims, user } =
        useAuth0();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const roleClaimType = "https://intramu.app.com/roles";

    // will redirect user to finish profile if they're not found in database
    // will not redirect if there is an internal server error
    useEffect(() => {
        const fetch = async () => {
            const response = await newGetRequest<IPlayer>("/players");
            if (isErrorResponse(response)) {
                if (response.statusCode === 404) {
                    navigate("/finish-profile");
                }
            }
        };
        if (!isLoading && isAuthenticated && location.pathname !== "/finish-profile") {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isLoading]);

    // useEffect(() => {
    //     // TODO: remove sudo in production
    //     const authorizedRoles = ["Player", "Sudo"];

    //     const fetch = async () => {
    //         setPageLoading(true);
    //         const claims = await getIdTokenClaims();

    //         if (!claims) {
    //             setIsAuthorized(false);
    //             setPageLoading(false);
    //             return;
    //         }

    //         const roles: string[] = claims[roleClaimType];
    //         const authorize = authorizedRoles.some((role) => roles.includes(role));

    //         if (!authorize) {
    //             setIsAuthorized(false);
    //             setPageLoading(false);
    //             return;
    //         }

    //         setIsAuthorized(true);
    //         setPageLoading(false);
    //     };
    //     fetch();
    // }, [getIdTokenClaims]);

    // console.log(playerLoading);

    // useEffect(() => {
    //     console.log("check");

    //     if (playerError?.statusCode === 404 && location.pathname !== "/finish-profile") {
    //         navigate("/finish-profile");
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isAuthenticated, isLoading, playerError, playerLoading]);

    if (error) {
        return <div>Well this is a weird error. Not sure what happened</div>;
    }

    if (isLoading || pageLoading) {
        return <div style={{ backgroundColor: "red" }}>Loading...</div>;
    }

    if (!isAuthenticated) {
        loginWithRedirect({
            appState: {
                returnTo: window.location.pathname,
            },
        });
        return <div style={{ backgroundColor: "red" }}>new loading</div>;
    }

    // if (!isAuthorized) {
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
