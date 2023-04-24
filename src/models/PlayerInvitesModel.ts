import { makeAutoObservable } from "mobx";
import { newGetRequest, newPostRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { IPlayerInvite } from "../interfaces/IPlayerInvite";
import { result } from "../utilities/modelResult";

export class PlayerInvitesModel {
    invites: IPlayerInvite[] = [];

    state = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchInvites() {
        this.state = "pending";
        const response = yield* result(newGetRequest<IPlayerInvite[]>("/players/requests"));
        if (isErrorResponse(response)) {
            return;
        }

        this.invites = response;
        setTimeout(() => {
            this.state = "done";
        }, 2000);
    }

    *acceptInvite(teamId: number) {
        const response = yield* result(
            newPostRequest<boolean, null>(`/players/requests/teams/${teamId}:accept`)
        );
        if (isErrorResponse(response)) {
            return;
        }

        this.invites = this.invites.filter((invite) => invite.teamId !== teamId);
    }

    declineInvite(teamId: number) {
        this.invites = this.invites.filter((invite) => invite.teamId !== teamId);
    }
    // *declineInvite(teamId: number) {
    //     // const response = yield* result(newDeleteRequest(`need url`));
    //     // if (isErrorResponse(response)) {
    //     //     return;
    //     // }

    //     this.invites = this.invites.filter((invite) => invite.teamId !== teamId);
    // }
}
