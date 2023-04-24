import { makeAutoObservable } from "mobx";
import {
    newDeleteRequest,
    newGetRequest,
    newPatchRequest,
    newPostRequest,
} from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { TeamRole, TeamVisibility } from "../../utilities/enums/teamEnum";
import { result } from "../../utilities/modelResult";
import { RosterPlayerModel } from "./RosterPlayerModel";
import { ContestGameStore } from "../stores/ContestGameStore";
import { TeamRequestStore } from "../stores/TeamRequestStore";

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

    requestStore = new TeamRequestStore();

    contestGameStore = new ContestGameStore();

    // loading variables
    fetching = "pending";

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

    fetchTeam(id: number) {
        this.fetchTeamById(id);
        this.requestStore.fetchRequests(id);
        this.contestGameStore.fetchTeamGames(id);
    }

    *fetchTeamById(id: number) {
        this.fetching = "pending";
        this.error = "";

        const response = yield* result(newGetRequest<TeamModel>(`/teams/${id}`));

        if (isErrorResponse(response)) {
            this.error = response.errorMessage;
            this.fetching = "done";
            return;
        }

        this.construct(response);
        this.fetching = "success";
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

    // joinTeam = flow(function* (id: number) {
    //     const response = yield* result(newPostRequest<boolean, null>(`/teams/${id}/requests/`));
    // });

    *joinTeam() {
        this.state = "pending";
        this.error = "";

        if (this.visibility === TeamVisibility.PRIVATE) {
            const response = yield* result(
                newPostRequest<boolean, null>(`/teams/${this.id}/requests/`)
            );
            if (isErrorResponse(response)) {
                this.error = response.errorMessage;
                this.state = "done";
            }
            this.state = "success";
            return;
        }

        const response = yield* result(newPostRequest<boolean, null>(`/teams/${this.id}/players/`));
        if (isErrorResponse(response)) {
            this.error = response.errorMessage;
            this.state = "done";
            return;
        }

        this.state = "success";
    }

    *removeFromTeam(authId: string) {
        this.state = "pending";
        this.error = "";

        const response = yield* result(newDeleteRequest(`/teams/${this.id}/players/${authId}`));
        if (isErrorResponse(response)) {
            this.error = response.errorMessage;
            this.state = "done";
            return;
        }

        this.players = this.players.filter((player) => player.authId !== authId);
        this.state = "success";
    }

    removePlayer(authId: string) {
        this.removeFromTeam(authId);
        this.players = this.players.filter((player) => player.authId !== authId);
    }

    updatePlayerRole(authId: string, role: TeamRole) {
        console.log("what");

        const player = this.players.find((x) => x.authId === authId);
        console.log(player?.authId);

        player?.updateRole(role);
    }

    // private changeState(state: State) {
    //     switch(state){
    //         case state === State.LOADING {
    //             this.error = "";
    //             this.state = "pending";
    //         }
    //     }
    // }
}
