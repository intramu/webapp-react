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

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    fetchPlayers() {
        this.state = "pending";
        // const response = newGetRequest("")
    }

    // fetchOrganization
}
