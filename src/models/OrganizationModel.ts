import { makeAutoObservable } from "mobx";
import { newGetRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { result } from "./modelResult";

interface IOrganizationProps {
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

    dateCreated = "";

    state = "pending";

    error = "";

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    construct(props: Partial<IOrganizationProps>) {
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

    *fetchOrganization(id: string){
        this.state = "pending";
        this.error = "";

        const r = yield* result(newGetRequest<OrganizationModel>(`/organization/${id}`));
        if(isErrorResponse(r)){
            return
        }

        this.construct(r)
        this.id = r.id;
        this.name = r.name;
        this.info = r.info;
        this.mainColor = r.mainColor;
        this.approvalStatus = r.approvalStatus;
        this.primaryContactEmail = 
    }
}
