import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Error404 from "../Error404";

export default function AuthAdmin() {
    const { getIdTokenClaims, error, isLoading } = useAuth0();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const roleClaimType = "https://intramu.app.com/roles";
    const authorizedRoles = ["Admin", "Sudo"];

    useEffect(() => {
        const getRoles = async () => {
            const claims = await getIdTokenClaims();
            if (!claims) {
                throw new Error("No claims");
            }
            return claims[roleClaimType] || [];
        };
        const checkRoles = async () => {
            const roles = await getRoles();

            const isAuthorizedTemp = authorizedRoles.every((role) => {
                return roles.includes(role);
            });

            if (!isAuthorizedTemp) return;
            setIsAuthorized(true);
        };
        checkRoles();
    });

    if (error || isLoading || !isAuthorized) {
        return <Error404 />;
    }

    return isAuthorized && <Outlet />;
}
