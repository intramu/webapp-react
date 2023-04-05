import { makeAutoObservable, runInAction } from "mobx";
import { newDeleteRequest, getRequest, postRequest } from "../common/functions/axiosRequests";
import { ErrorResponse, isErrorResponse } from "../interfaces/ErrorResponse";
import { ITeam } from "../interfaces/ITeam";
import { RosterPlayer } from "./team/RosterPlayerModel";
import { JoinRequestModel } from "./team/JoinRequestModel";
import { TeamModel } from "./TeamModel";
import { HttpClient } from "../utilities/auth/instance";
import { instance } from "../utilities/axiosInstance";

const httpClient = new HttpClient();

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

    constructor() {
        makeAutoObservable(this);
    }

    // async fetchTeam(id: number, token: string) {
    //     const resource = getRequest<ITeam>(`/teams/${id}`, token);
    //     const team = resource.read();

    //     if (isErrorResponse(team)) {
    //         throw Error(team.errorMessage);
    //     }

    //     runInAction(() => {
    //         this.id = team.id;
    //     });
    // }

    *fetchTeam(id: number, token: string) {
        const team: TeamModel = yield getRequest<TeamModel>(`/teams/${id}`, token);
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

    async removePlayer(authId: string) {
        const response = await newDeleteRequest(`/teams/${this.id}/players/${authId}`);
        if (isErrorResponse(response)) {
            throw Error(response.errorMessage);
        }

        this.players = this.players.filter((player) => player.authId !== authId);
    }
}
