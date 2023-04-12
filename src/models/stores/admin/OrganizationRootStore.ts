import { makeAutoObservable } from "mobx";
import { newGetRequest } from "../../../common/functions/axiosRequests";

export class OrganizationRootStore {
    id = "";

    name = "";

    info = "";

    mainColor = "";

    approvalStatus = "";

    primaryContactEmail = "";

    studentContactEmail = "";

    dateCreated = "";

    teams = [];

    players = [];

    state = "pending";

    error = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchOrganization(id: string) {
        this.state = "pending";
        this.error = "";

        const response = newGetRequest < Orga(`/organization/${id}`);
    }

    fetchPlayers() {
        this.state = "pending";
        // const response = newGetRequest("")
    }

    // fetchOrganization
}
