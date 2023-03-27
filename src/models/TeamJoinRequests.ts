import { makeAutoObservable } from "mobx";
import { IJoinRequest } from "../interfaces/ITeamJoinRequest";

export class TeamJoinRequests {
    requests: IJoinRequest[] = [];
    // playerAuthId = "";

    // teamId = 0;

    // requestingPlayerFullName = "";

    // timeSent = Date.now();

    // expirationTime = Date.now();

    constructor() {
        makeAutoObservable(this);
    }

    async fetch() {
        // api call to grab all join requests for team
        // if successful update list with requests
        // if error pass to error boundary
    }

    async accept() {
        // api call to accept the request
        // if successful remove the request
        // and redirect to new team. - either here or calling component
        // if error pass to error boundary
    }

    async delete() {
        // api call to delete the request
        // if successful remove the request
        // if error pass to error boundary
    }
}
