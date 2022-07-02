import { useAuth0, } from "@auth0/auth0-react";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";

export default function AuthPlayer() {
    const { isAuthenticated, loginWithRedirect, isLoading, error, user } = useAuth0();

    if (error) {
        return (
            <div>Well this is a weird error. Not sure what happened</div>
        )
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (!isAuthenticated) {
        loginWithRedirect();
        return;
    }

    /**
     * In a production build of the project a post registration auth0 action will 
     * be used to add the users id to my external database which will store additional 
     * user info like:
     *  - team
     *  - stats
     * 
     * On logging in the id can be retrieved through the auth0 hook 
     */

    return (isAuthenticated &&
        <Outlet />)
}
