import { makeAutoObservable } from "mobx";

export class TeamJoinRequestModel {
    authId = "";

    teamId = 0;

    requestingPlayerFullName = "";

    timeSent = new Date();

    expirationTime = new Date();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
