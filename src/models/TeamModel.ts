import { action, makeObservable, observable, runInAction } from "mobx";
import { Role, Sport, Visibility } from "../common/enums";
import { getRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { IRosterPlayer } from "../interfaces/IPlayer";
import { ITeam } from "../interfaces/ITeam";
import { RosterPlayer } from "./RosterPlayerModel";

export class TeamModel {
    id = 0;

    name = "";

    // I think the rest of the team fields would be here

    players: RosterPlayer[] = [];

    constructor() {
        // I know i can make this autoobservable but I was doing it manually to learn
        makeObservable(this, {
            id: observable,
            name: observable,
            removePlayer: action,
            fetchTeam: action,
        });
    }

    // Im going to have an issue here because the token can only be grabbed through a hook call
    // there is an alternative
    async fetchTeam(id: number, tempToken: string) {
        const team = await getRequest<any>(`/teams/${id}`, tempToken);
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
        const index = this.players.findIndex((x) => x.authId === authId);
        this.players.splice(index, 1);
    }
}
