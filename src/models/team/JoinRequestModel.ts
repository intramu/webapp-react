import { makeAutoObservable } from "mobx";
import { postRequest } from "../../common/functions/axiosRequests";
import { ErrorResponse } from "../../interfaces/ErrorResponse";

export class JoinRequestModel {
    playerAuthId = "";

    teamId = 0;

    requestingPlayerFullName = "";

    timeSent = new Date();

    expirationTime = new Date();

    constructor() {
        makeAutoObservable(this);
    }
}
