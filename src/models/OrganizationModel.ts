import { makeAutoObservable } from "mobx";
import { newGetRequest, newPatchRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { result } from "../utilities/modelResult";

interface OrganizationModelProps {
    id: string;
    name: string;
    image: string;
    info: string;
    mainColor: string;
    approvalStatus: string;
    dateCreated: string;
}

export class OrganizationModel {
    id = "";

    name = "";

    info = "";

    mainColor = "";

    approvalStatus = "";

    primaryContactEmail = "";

    studentContactEmail = "";

    address = "";

    city = "";

    state = "";

    zipCode = "";

    dateCreated = "";

    loadingState = "pending";

    error = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    construct(props: Partial<OrganizationModelProps>) {
        const {
            id = "",
            name = "",
            image = "",
            info = "",
            mainColor = "",
            approvalStatus = "",
            dateCreated = "",
        } = props;

        this.id = id;
        this.name = name;
        this.info = info;
        this.mainColor = mainColor;
        this.approvalStatus = approvalStatus;
        this.dateCreated = dateCreated;
    }

    *fetchOrganization() {
        this.loadingState = "pending";
        this.error = "";

        const r = yield* result(newGetRequest<OrganizationModel>(`/organization`));
        if (isErrorResponse(r)) {
            return;
        }

        this.construct(r);
        this.loadingState = "success";
    }

    *updateOrganization(org: OrganizationModel) {
        this.loadingState = "pending";
        this.error = "";

        const r = yield* result(
            newPatchRequest<OrganizationModel, OrganizationModel>(`/organization`, org)
        );
        if (isErrorResponse(r)) {
            return;
        }

        this.construct(r);
        this.loadingState = "success";
    }
}
