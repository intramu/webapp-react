import {
    action,
    flowResult,
    makeAutoObservable,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import { newDeleteRequest, getRequest, postRequest } from "../common/functions/axiosRequests";
import { ErrorResponse, isErrorResponse } from "../interfaces/ErrorResponse";
import { ITeam } from "../interfaces/ITeam";
import { RosterPlayer } from "./team/RosterPlayerModel";
import { JoinRequestModel } from "./team/JoinRequestModel";
import { TeamModel } from "./TeamModel";
import { instance } from "../utilities/axiosInstance";
import { TeamRole } from "../utilities/enums/teamEnum";

export class TestTeamModel {
    id = 0;

    name = "";

    wins = 0;

    ties = 0;

    losses = 0;

    image = "";

    visibility = "";

    gender = "";

    dateCreated = "";

    sportsmanshipScore = 0;

    status = "";

    maxTeamSize = 0;

    players: RosterPlayer[] = [];

    requests: JoinRequestModel[] = [];

    // loading variables
    state = "pending";

    error = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        // makeObservable(this, {
        //     players: observable,
        //     removePlayer: action,
        // });
    }

    // async fetchTeam(id: number, token: string) {
    //     const team = await getRequest<TeamModel>(`/teams/${id}`, token);

    //     console.log(team);

    //     if (isErrorResponse(team)) {
    //         throw Error(team.errorMessage);
    //     }

    //     runInAction(() => {
    //         this.id = team.id;
    //         this.players = team.players;
    //         this.visibility = team.visibility;
    //     });
    // }

    *fetchTeam(id: number, token: string) {
        const team = yield* result(getRequest<TeamModel>(`/teams/${id}`, token));
        // const team = yield* result(instance.get("/teams"));
        console.log(team);

        if (isErrorResponse(team)) {
            throw Error(team.errorMessage);
        }

        console.log(team);

        this.id = team.id;
        this.name = team.name;
        this.players = team.players;
    }

    *acceptRequest(userId: string, token: string) {
        const response: boolean = yield postRequest(
            `/teams/${this.id}/requests/${userId}:accept`,
            token
        );

        if (isErrorResponse(response)) {
            throw Error(response.errorMessage);
        }

        this.filterRequests(this.id, userId);
    }

    *declineRequest(userId: string, token: string) {
        const response: boolean = yield postRequest(
            `/teams/${this.id}/requests/${userId}:accept`,
            token
        );

        if (isErrorResponse(response)) {
            throw Error(response.errorMessage);
        }

        this.filterRequests(this.id, userId);
    }

    private filterRequests(teamId: number, userId: string) {
        this.requests = this.requests.filter(
            (request) => request.playerAuthId !== userId && request.teamId !== teamId
        );
    }

    // *removePlayer(authId: string) {
    //     const response = yield deleteRequest(`/teams/${this.id}/players/${authId}`);

    //     if (response === true) {
    //         this.players = this.players.filter((player) => player.authId !== authId);
    //     }
    // }

    removePlayer(authId: string) {
        this.players = this.players.filter((player) => player.authId !== authId);
    }

    updatePlayerRole(authId: string, role: TeamRole) {
        const budge = this.players.find((x) => x.authId === authId);
        budge?.updateRole(role);
    }

    // async removePlayer(authId: string) {
    //     const response = await newDeleteRequest(`/teams/${this.id}/players/${authId}`);

    //     runInAction(() => {
    //         if (isErrorResponse(response)) {
    //             this.error = response.errorMessage;
    //             this.state = "done";
    //             return;
    //         }

    //         this.players = this.players.filter((player) => player.authId !== authId);
    //         this.state = "success";
    //     });
    // }
}

export function* result<T>(promise: Promise<T>) {
    return (yield promise) as T;
}
