import { makeAutoObservable } from "mobx";
import { TeamModel } from "../team/TeamModel";
import { result } from "../../utilities/modelResult";
import { newGetRequest, newPostRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { TeamVisibility } from "../../utilities/enums/teamEnum";

export interface CreateTeamProps {
    name: string;
    image: string;
    contest: number;
    league: number;
    divisionId: number;
    visibility?: TeamVisibility;
}

export class TeamStore {
    teams: TeamModel[] = [];

    allState = "pending";

    allError = "";

    createTeamState = "pending";

    createTeamError = "";

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

    *fetchMyTeams() {
        const response = yield* result(newGetRequest<TeamModel[]>("/players/teams"));

        if (isErrorResponse(response)) {
            this.allError = response.errorMessage;
            return;
        }

        this.teams = response;
    }

    *createTeam(props: CreateTeamProps) {
        this.createTeamState = "pending";

        const response = yield* result(newPostRequest<TeamModel, CreateTeamProps>("/teams", props));
        if (isErrorResponse(response)) {
            this.createTeamState = "done";
            this.createTeamError = response.errorMessage;
            return;
        }

        this.teams.push(response);
        this.createTeamState = "success";

        this.fetchMyTeams();
    }

    // returns list of teams based on name provided
    // *searchTeams(name: string) {}
}
