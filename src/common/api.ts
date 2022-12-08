import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
});

// ! REVISIT
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiCreateTeam(token: string, team: any) {
    return instance.post("/team/createTeam", team, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiShowAllTeams(token: string) {
    return instance.get("/team/showAllTeams", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiJoinTeam(token: string, playerId: string, teamId: number) {
    const body = { playerId, teamId };
    return instance.post("/team/joinOpenTeam", body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiShowAllPlayersTeams(playerId: string, token: string) {
    const body = { playerId };
    return instance.post("/team/showAllPlayersTeams", body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiLeaveTeam(token: string, playerId: string, teamId: number) {
    const body = { playerId, teamId };
    return instance.delete("/team/leaveTeam", {
        data: body,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiUpdateTeam(token: string, playerId: string, team: object) {
    const body = { playerId, team };
    return instance.put("/team/updateTeam", body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

// export async function apiUpdateOrganization(
//     token: string,
//     competition: object
// ){
//     let body
// }

export async function apiCreateCompetition(token: string, adminId: string, competition: object) {
    const body = { adminId, competition };
    return instance.post("/admin/createCompetition", body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

// ! REVISIT
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function apiFindCompetitionTree(token: string, competitionId: number) {
    return instance.get("/discover");
}
