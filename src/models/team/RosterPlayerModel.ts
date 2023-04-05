import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Gender, Role, Status } from "../../common/enums";
import { putRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { IPlayer } from "../../interfaces/IPlayer";

export class RosterPlayer {
    authId = "";

    role = Role.PLAYER;

    firstName = "";

    lastName = "";

    gender = Gender.MALE;

    status = Status.ACTIVE;

    constructor() {
        makeAutoObservable(this);
    }

    *updateRole(role: Role, teamId: number, token: string) {
        const response: boolean = yield putRequest<null, { role: Role }>(
            `/teams/${teamId}/players/${this.authId}`,
            token,
            {
                role,
            }
        );

        if (isErrorResponse(response)) {
            throw Error(response.errorMessage);
        }

        this.role = role;
    }
}
