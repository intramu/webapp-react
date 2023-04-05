import { makeAutoObservable, runInAction } from "mobx";
import { newDeleteRequest, newGetRequest, newPostRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { IPlayerInvite } from "../interfaces/IPlayerInvite";

export class PlayerInviteModel {
    invites: IPlayerInvite[] = [];

    state = "";

    constructor() {
        makeAutoObservable(this);
    }

    async fetchRequests() {
        // this.state = "pending";
        const response = await newGetRequest<IPlayerInvite[]>("/players/requests");
        if (isErrorResponse(response)) {
            runInAction(() => {
                this.state = "error";
            });
            return;
        }
        // this.invites = [];

        runInAction(() => {
            this.invites = response;
            this.state = "done";
        });
        // const test = yield newGetRequest<IPlayerInvite[]>("/players/requests");
    }

    async acceptInvite(teamId: number) {
        const response = await newPostRequest(`/players/requests/teams/${teamId}:accept`);
        if (isErrorResponse(response)) {
            return;
        }

        runInAction(() => {
            this.invites = this.invites.filter((invite) => invite.teamId !== teamId);
        });
    }

    async declineInvite(teamId: number) {
        // const response = await newDeleteRequest(`need url`);
        // if (isErrorResponse(response)) {
        //     return;
        // }

        return;

        runInAction(() => {
            this.invites = this.invites.filter((invite) => invite.teamId !== teamId);
        });
    }
}
