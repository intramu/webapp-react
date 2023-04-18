import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userRootStore } from "./_routes";

/** The Initializer will hopefully be used to initialize high level  */
export const Initializer = observer(() => {
    const { fetchPlayer, fetchInvites, fetchTeams, fetchContests } = userRootStore;
    useEffect(() => {
        fetchPlayer();
        fetchInvites();
        fetchTeams();
        fetchContests();
    }, [fetchPlayer, fetchInvites, fetchTeams, fetchContests]);

    return <Outlet />;
});