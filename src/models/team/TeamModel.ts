import { makeAutoObservable } from "mobx";
import {
    newDeleteRequest,
    newGetRequest,
    newPostRequest,
} from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { ITeam } from "../../interfaces/ITeam";
import { JoinRequestModel } from "./JoinRequestModel";
import { TeamRole } from "../../utilities/enums/teamEnum";
import { result } from "../modelResult";
import { RosterPlayerModel } from "./RosterPlayerModel";

enum State {
    LOADING = 1,
    SUCCESS = 2,
    ERROR = 3,
}

export class TeamModel {
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

    players: RosterPlayerModel[] = [];

    requests: JoinRequestModel[] = [];

    // loading variables
    state = "pending";

    error = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchTeam(id: number) {
        this.state = "pending";
        this.error = "";

        const team = yield* result(newGetRequest<TeamModel>(`/teams/${id}`));

        if (isErrorResponse(team)) {
            this.error = team.errorMessage;
            this.state = "done";
            return;
        }

        this.id = team.id;
        this.name = team.name;
        this.wins = team.wins;
        this.ties = team.ties;
        this.losses = team.losses;
        this.image = team.image;
        this.visibility = team.visibility;
        this.gender = team.gender;
        this.dateCreated = team.dateCreated;
        this.sportsmanshipScore = team.sportsmanshipScore;
        this.status = team.status;
        this.maxTeamSize = team.maxTeamSize;
        this.players = team.players;
        this.requests = team.requests;

        this.state = "success";
    }

    *acceptRequest(userId: string) {
        this.state = "pending";
        this.error = "";

        const response = yield* result(
            newPostRequest<boolean, null>(`/teams/${this.id}/requests/${userId}:accept`)
        );

        if (isErrorResponse(response)) {
            this.state = "done";
            this.state = response.errorMessage;
        }

        this.filterRequests(this.id, userId);
        this.state = "success";
    }

    *declineRequest(userId: string) {
        this.state = "pending";
        this.error = "";

        const response = yield* result(
            newDeleteRequest(`/teams/${this.id}/requests/${userId}:accept`)
        );

        if (isErrorResponse(response)) {
            this.state = "done";
            this.state = response.errorMessage;
        }

        this.filterRequests(this.id, userId);
        this.state = "success";
    }

    removePlayer(authId: string) {
        this.players = this.players.filter((player) => player.authId !== authId);
    }

    updatePlayerRole(authId: string, role: TeamRole) {
        const player = this.players.find((x) => x.authId === authId);
        player?.updateRole(role, this.id);
    }

    private filterRequests(teamId: number, userId: string) {
        this.requests = this.requests.filter(
            (request) => request.playerAuthId !== userId && request.teamId !== teamId
        );
    }

    // private changeState(state: State) {
    //     switch(state){
    //         case state === State.LOADING {
    //             this.error = "";
    //             this.state = "pending";
    //         }
    //     }
    // }

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
}
