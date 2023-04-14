import { makeAutoObservable } from "mobx";
import { TeamModel } from "../team/TeamModel";
import { result } from "../../utilities/modelResult";
import { newGetRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";

export class TeamStore {
    teams: TeamModel[] = [];

    allState = "pending";

    allError = "";

    searchState = "pending";

    searchError = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchAllTeams() {
        const response = yield* result(newGetRequest<TeamModel[]>("/organization/teams"));

        if (isErrorResponse(response)) {
            return;
        }

        this.teams = response;
    }

    // returns list of teams based on name provided
    // *searchTeams(name: string) {}
}
