import { makeAutoObservable } from "mobx";
import { newGetRequest } from "../../../common/functions/axiosRequests";
import { OrganizationModel } from "../../OrganizationModel";
import { TeamStore } from "../TeamStore";
import { PlayerStore } from "../PlayerStore";

export class OrganizationRootStore {
    organization: OrganizationModel;

    teamStore: TeamStore;

    playerStore: PlayerStore;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        this.organization = new OrganizationModel();
        this.teamStore = new TeamStore();
        this.playerStore = new PlayerStore();
    }

    // *fetchOrganization(id: string) {
    //     this.state = "pending";
    //     this.error = "";

    //     const response = newGetRequest < Orga(`/organization/${id}`);
    // }

    // fetchOrganization
}
