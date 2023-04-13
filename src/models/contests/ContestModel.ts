import { makeAutoObservable, runInAction } from "mobx";
import { newGetRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IContest } from "../../interfaces/competition/IContest";
import { ILeague } from "../../interfaces/competition/ILeague";
import { result } from "../modelResult";
import { LeagueModel } from "./LeagueModel";

const test = {
    id: "id",
    name: "name",
};

export class ContestModel {
    id = 0;

    name = "";

    visibility = "";

    status = "";

    season = "";

    term = 0;

    dateCreated = new Date().getUTCDate();

    year = "";

    leagues: LeagueModel[] = [];

    state = "pending";

    error = "";

    constructor() {
        makeAutoObservable(this);
    }

    *fetchContest(id: number) {
        this.state = "pending";
        this.error = "";

        const response = yield* result(newGetRequest<ContestModel>(`/contests/${id}`));

        if (isErrorResponse(response)) {
            this.state = "pending";
            this.error = response.errorMessage;
            return;
        }

        this.id = response.id;
        this.name = response.name;
        this.visibility = response.visibility;
        this.status = response.status;
        this.season = response.season;
        this.term = response.term;
        this.year = response.year;
        this.dateCreated = response.dateCreated;
        this.leagues = response.leagues;

        this.state = "success";
    }

    // handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     const { value, name: test } = e.target;

    //     if(this.hasKey(test))
    //     this[test] = value;
    // }

    // eslint-disable-next-line class-methods-use-this
}
