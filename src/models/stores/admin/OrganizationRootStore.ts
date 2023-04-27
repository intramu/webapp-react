import { makeAutoObservable } from "mobx";
import { OrganizationModel } from "../../OrganizationModel";
import { TeamStore } from "../TeamStore";
import { PlayerStore } from "../PlayerStore";
import { AdminStore } from "../AdminStore";

export class OrganizationRootStore {
    organization: OrganizationModel;

    teamStore: TeamStore;

    playerStore: PlayerStore;

    adminStore: AdminStore;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        this.organization = new OrganizationModel();
        this.teamStore = new TeamStore();
        this.playerStore = new PlayerStore();
        this.adminStore = new AdminStore();
    }

    // *fetchOrganization(id: string) {
    //     this.state = "pending";
    //     this.error = "";

    //     const response = newGetRequest < Orga(`/organization/${id}`);
    // }

    // fetchOrganization
}
