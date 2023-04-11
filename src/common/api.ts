import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../interfaces/ErrorResponse";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
});

// ! REVISIT
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function apiCreateTeam(token: string, team: any) {
    return instance.post("/api/team", team, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function apiFindPlayerProfile<T>(token: string): Promise<T | ErrorResponse> {
    return instance
        .get<T>("/api/playr", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            const error = err as AxiosError;

            const errno: ErrorResponse = {
                statusCode: error.response?.status || 500,
                errorMessage: error.message || "Internal Server Error",
            };

            console.log(err);

            return errno;
        });
}

export async function apiCreatePlayer(token: string, values: any) {
    return instance.post("/api/player/", values, {
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
    return instance.post("/team/request", body, {
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

export async function apiGetOrganizationList(token: string) {
    return instance.get("/api/organization", {
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
