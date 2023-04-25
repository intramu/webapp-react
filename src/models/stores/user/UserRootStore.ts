import { makeAutoObservable } from "mobx";
import { ContestStore } from "../ContestStore";
import { TeamStore } from "../TeamStore";
import { PlayerModel } from "../../PlayerModel";
import { PlayerInvitesModel } from "../../PlayerInvitesModel";
import { result } from "../../../utilities/modelResult";
import { newGetRequest } from "../../../common/functions/axiosRequests";
import { isErrorResponse } from "../../../interfaces/ErrorResponse";
import { OrganizationModel } from "../../OrganizationModel";

export class UserRootStore {
    organization: OrganizationModel;

    player: PlayerModel;

    contestStore: ContestStore;

    inviteStore: PlayerInvitesModel;

    teamStore: TeamStore;

    // announcements:

    // faqs

    createTeamState = "pending";

    createTeamError = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        this.player = new PlayerModel();
        this.contestStore = new ContestStore();
        this.inviteStore = new PlayerInvitesModel();
        this.teamStore = new TeamStore();
        this.organization = new OrganizationModel();

        // this.fetchPlayer();
    }

    *fetchPlayer() {
        const response = yield* result(newGetRequest<PlayerModel>("/players"));

        if (isErrorResponse(response)) {
            return;
        }

        this.player = response;
    }

    fetchOrganization() {
        this.organization.fetchPlayerOrganization();
    }

    fetchInvites() {
        this.inviteStore.fetchInvites();
    }

    fetchContests() {
        this.contestStore.fetchContests();
    }

    fetchTeams() {
        this.teamStore.fetchMyTeams();
    }
}
