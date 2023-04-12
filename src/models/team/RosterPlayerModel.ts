import { makeAutoObservable } from "mobx";
import { newPutRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { TeamRole } from "../../utilities/enums/teamEnum";
import { PlayerGender, PlayerStatus } from "../../utilities/enums/userEnum";
import { result } from "../modelResult";

export class RosterPlayerModel {
    authId = "";

    role = TeamRole.PLAYER;

    firstName = "";

    lastName = "";

    gender = PlayerGender.MALE;

    status = PlayerStatus.ACTIVE;

    state = "pending";

    error = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *updateRole(role: TeamRole, teamId: number) {
        this.state = "pending";
        this.error = "";

        const response = yield* result(
            newPutRequest<null, { role: TeamRole }>(`/teams/${teamId}/players/${this.authId}`, {
                role,
            })
        );

        if (isErrorResponse(response)) {
            this.error = response.errorMessage;
            this.state = "done";
        }

        this.role = role;
        this.state = "success";
    }
    // async updateRole(role: TeamRole, teamId: number) {
    //     this.state = "pending";
    //     this.error = "";

    //     const response = await newPutRequest<null, { role: TeamRole }>(
    //         `/teams/${teamId}/players/${this.authId}`,
    //         {
    //             role,
    //         }
    //     );

    //     runInAction(() => {
    //         if (isErrorResponse(response)) {
    //             this.error = response.errorMessage;
    //             this.state = "done";
    //         }

    //         this.role = role;
    //         this.state = "success";
    //     });
    // }
}
