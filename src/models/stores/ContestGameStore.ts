import { makeAutoObservable } from "mobx";
import { ContestGameModel } from "../contests/ContestGameModel";
import { result } from "../../utilities/modelResult";
import { newGetRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";

export class ContestGameStore {
    games: ContestGameModel[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchTeamGames(teamId: number) {
        const response = yield* result(
            newGetRequest<ContestGameModel[]>(`/teams/${teamId}/contests/games`)
        );

        if (isErrorResponse(response)) {
            return;
        }

        this.games = response;
    }

    *fetchAllGames(orgId: number) {
        const response = yield* result(newGetRequest<ContestGameModel[]>(`need url`));

        if (isErrorResponse(response)) {
            return;
        }

        this.games = response;
    }

    sortGamesByDate() {
        this.games.sort((a, b) => a.gameDate.date() - b.gameDate.date());
    }
}
