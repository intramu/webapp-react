import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userRootStore } from "./_routes";

/** Initializer makes background fetches on application load
 * Grabs current player, any invites, their teams, all contests, and organization information
 */
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
