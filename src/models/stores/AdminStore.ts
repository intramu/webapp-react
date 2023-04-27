import { makeAutoObservable } from "mobx";
import { newGetRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { result } from "../../utilities/modelResult";
import { AdminModel } from "../AdminModel";

export class AdminStore {
    admins: AdminModel[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchAllAdmins() {
        const response = yield* result(newGetRequest<AdminModel[]>("/organization/admins"));

        if (isErrorResponse(response)) {
            return;
        }

        this.admins = response;
    }
}
