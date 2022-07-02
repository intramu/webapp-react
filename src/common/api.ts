const axios = require("axios").default;
const instance = axios.create({
    baseURL: "http://localhost:8080/",
});

export async function apiCreateTeam(token: string, team: any) {
    return await instance.post("/team/createTeam", team, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiShowAllTeams(token: string) {
    return await instance.get("/team/showAllTeams", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiJoinTeam(
    token: string,
    playerId: string,
    teamId: number
) {
    let body = { playerId: playerId, teamId: teamId };
    return await instance.post("/team/joinOpenTeam", body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiShowAllPlayersTeams(playerId: string, token: string) {
    let body = { playerId: playerId };
    return await instance.post("/team/showAllPlayersTeams", body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiLeaveTeam(
    token: string,
    playerId: string,
    teamId: number
) {
    let body = { playerId: playerId, teamId: teamId };
    return await instance.delete("/team/leaveTeam", {
        data: body,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function apiUpdateTeam(
    token: string,
    playerId: string,
    team: object
) {
    let body = { playerId: playerId, team: team };
    return await instance.put("/team/updateTeam", body, {
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

export async function apiCreateCompetition(
    token: string,
    adminId: string,
    competition: object
) {
    let body = { adminId: adminId, competition: competition };
    return await instance.post("/admin/createCompetition", body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}
