import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userRootStore } from "./_routes";

/** The Initializer will hopefully be used to initialize high level  */
export const Initializer = observer(() => {
    const { fetchPlayer, fetchInvites, fetchTeams, fetchContests, fetchOrganization } =
        userRootStore;
    useEffect(() => {
        fetchPlayer();
        fetchInvites();
        fetchTeams();
        fetchContests();
        fetchOrganization();
    }, [fetchPlayer, fetchInvites, fetchTeams, fetchContests, fetchOrganization]);

    return <Outlet />;
});
