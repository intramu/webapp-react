import { makeAutoObservable } from "mobx";
import { ContestModel } from "../contests/ContestModel";
import { newGetRequest } from "../../common/functions/axiosRequests";
import { result } from "../../utilities/modelResult";
import { isErrorResponse } from "../../interfaces/ErrorResponse";

export class ContestStore {
    contests: ContestModel[] = [];

    fetchingError = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchContests() {
        this.fetchingError = "";
        const response = yield* result(newGetRequest<ContestModel[]>("/contests"));
        console.log(response);

        if (isErrorResponse(response)) {
            this.fetchingError = response.errorMessage;
            return;
        }

        this.contests = response;
    }
}
