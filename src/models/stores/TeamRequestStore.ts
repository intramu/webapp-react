import { makeAutoObservable } from "mobx";
import { TeamJoinRequestModel } from "../team/TeamJoinRequestModel";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { result } from "../../utilities/modelResult";
import {
    newDeleteRequest,
    newGetRequest,
    newPostRequest,
} from "../../common/functions/axiosRequests";

export class TeamRequestStore {
    requests: TeamJoinRequestModel[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchRequests(teamId: number) {
        const response = yield* result(
            newGetRequest<TeamJoinRequestModel[]>(`/teams/${teamId}/requests`)
        );

        if (isErrorResponse(response)) {
            return;
        }

        this.requests = response;
    }

    *acceptRequest(teamId: number, authId: string) {
        const response = yield* result(
            newPostRequest<boolean, null>(`/teams/${teamId}/requests/${authId}:accept`)
        );

        if (isErrorResponse(response)) {
            return;
        }

        this.filterRequests(teamId, authId);
    }

    *declineRequest(teamId: number, authId: string) {
        const response = yield* result(
            newDeleteRequest(`/teams/${teamId}/requests/${authId}:accept`)
        );

        if (isErrorResponse(response)) {
            return;
        }

        this.filterRequests(teamId, authId);
    }

    private filterRequests(teamId: number, userId: string) {
        this.requests = this.requests.filter(
            (request) => request.authId !== userId && request.teamId !== teamId
        );
    }
}
