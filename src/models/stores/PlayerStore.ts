import { makeAutoObservable } from "mobx";
import { PlayerModel } from "../PlayerModel";
import { newGetRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { result } from "../modelResult";

export class PlayerStore {
    players: PlayerModel[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchAllPlayers() {
        const response = yield* result(newGetRequest<PlayerModel[]>("/organization/players"));

        if (isErrorResponse(response)) {
            return;
        }

        this.players = response;
    }
}
