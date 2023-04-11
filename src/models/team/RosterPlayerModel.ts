import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { newPutRequest } from "../../common/functions/axiosRequests";
import { isErrorResponse } from "../../interfaces/ErrorResponse";
import { TeamRole } from "../../utilities/enums/teamEnum";
import { PlayerGender, PlayerStatus } from "../../utilities/enums/userEnum";

export class RosterPlayer {
    authId = "";

    role = TeamRole.PLAYER;

    firstName = "";

    lastName = "";

    gender = PlayerGender.MALE;

    status = PlayerStatus.ACTIVE;

    state = "pending";

    error = "";

    constructor() {
        makeObservable(this, {
            authId: observable,
            updateRole: action,
            testFunction: action,
        });
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

    testFunction() {
        console.log("test function", this.authId);
    }

    updateRole(role: TeamRole) {
        this.role = role;
    }
}
