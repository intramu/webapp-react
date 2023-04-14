import { makeAutoObservable } from "mobx";
import { ContestStore } from "../ContestStore";
import { PlayerModel } from "../../PlayerModel";
import { PlayerInvitesModel } from "../../PlayerInvitesModel";
import { TeamModel } from "../../team/TeamModel";
import { result } from "../../../utilities/modelResult";
import { newGetRequest } from "../../../common/functions/axiosRequests";
import { isErrorResponse } from "../../../interfaces/ErrorResponse";

export class UserRootStore {
    player: PlayerModel;

    contestStore: ContestStore;

    inviteStore: PlayerInvitesModel;

    teamStore: TeamModel[] = [];

    // announcements:

    // faqs

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        this.player = new PlayerModel();
        this.contestStore = new ContestStore();
        this.inviteStore = new PlayerInvitesModel();

        // this.fetchPlayer();
    }

    *fetchPlayer() {
        const response = yield* result(newGetRequest<PlayerModel>("/players"));

        if (isErrorResponse(response)) {
            return;
        }

        this.player = response;
    }

    fetchInvites() {
        this.inviteStore.fetchInvites();
    }

    *fetchTeams() {
        const response = yield* result(newGetRequest<TeamModel[]>("/players/teams"));
        console.log(response);

        if (isErrorResponse(response)) {
            return;
        }

        this.teamStore = response;
    }
}
