import { makeAutoObservable, runInAction } from "mobx";
import { newGetRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IContest } from "../../interfaces/competition/IContest";
import { ILeague } from "../../interfaces/competition/ILeague";

export class ContestModel {
    id = 0;

    name = "";

    visibility = "";

    status = "";

    season = "";

    term = 0;

    dateCreated = new Date();

    year = "";

    leagues: ILeague[] = [];

    state = "pending";

    error = "";

    constructor() {
        makeAutoObservable(this);
    }

    async fetchContest(id: number) {
        this.state = "pending";
        this.error = "";

        const response = await newGetRequest<IContest>(`/contests/${id}`);

        console.log(response);

        runInAction(() => {
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
        });
    }
}
