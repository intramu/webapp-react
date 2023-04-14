import { makeAutoObservable } from "mobx";
import {
    newDeleteRequest,
    newGetRequest,
    newPatchRequest,
    newPostRequest,
} from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { JoinRequestModel } from "./JoinRequestModel";
import { TeamRole } from "../../utilities/enums/teamEnum";
import { result } from "../../utilities/modelResult";
import { RosterPlayerModel } from "./RosterPlayerModel";

interface TeamModelProps {
    id: number;
    name: string;
    wins: number;
    ties: number;
    losses: number;
    image: string;
    visibility: string;
    gender: string;
    dateCreated: string;
    sportsmanshipScore: number;
    status: string;
    maxTeamSize: number;
    players: RosterPlayerModel[];
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

    construct(props: Partial<TeamModelProps>) {
        const {
            id = 0,
            name = "",
            wins = 0,
            ties = 0,
            losses = 0,
            gender = "",
            status = "",
            visibility = "",
            maxTeamSize = 0,
            sportsmanshipScore = 0,
            image = "",
            dateCreated = "",
            players = [],
        } = props;

        this.id = id;
        this.name = name;
        this.wins = wins;
        this.ties = ties;
        this.losses = losses;
        this.gender = gender;
        this.status = status;
        this.visibility = visibility;
        this.maxTeamSize = maxTeamSize;
        this.sportsmanshipScore = sportsmanshipScore;
        this.image = image;
        this.players = players;
        this.dateCreated = dateCreated;
    }

    *fetchTeam(id: number) {
        this.state = "pending";
        this.error = "";

        const response = yield* result(newGetRequest<TeamModel>(`/teams/${id}`));

        if (isErrorResponse(response)) {
            this.error = response.errorMessage;
            this.state = "done";
            return;
        }

        this.construct(response);
        this.state = "success";
    }

    *updateTeam() {
        const response = yield* result(
            newPatchRequest<TeamModel, TeamModelProps>(`/organization/teams/${this.id}`, {
                id: this.id,
                name: this.name,
                wins: this.wins,
                ties: this.ties,
                losses: this.losses,
                gender: this.gender,
                status: this.status,
                visibility: this.visibility,
                maxTeamSize: this.maxTeamSize,
                sportsmanshipScore: this.sportsmanshipScore,
                image: this.image,
                players: this.players,
                dateCreated: this.dateCreated,
            })
        );

        if (isErrorResponse(response)) {
            return;
        }

        this.construct(response);
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
