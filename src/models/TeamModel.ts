import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { getRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { IRosterPlayer } from "../interfaces/IPlayer";
import { ITeam } from "../interfaces/ITeam";
import { RosterPlayer } from "./team/RosterPlayerModel";

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

    players: RosterPlayer[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchTeam(id: number, token: string) {
        const team = await getRequest<any>(`/teams/${id}`, token);
        if (isErrorResponse(team)) {
            return;
        }
        console.log(team);

        runInAction(() => {
            this.id = team.id;
            this.name = team.name;
            this.players = team.players;
        });
    }

    removePlayer(authId: string) {
        // I think the api call will be here
        this.players = this.players.filter((player) => player.authId !== authId);
    }
}
