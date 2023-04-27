import { makeAutoObservable } from "mobx";

export class AdminModel {
    authId = "";

    firstName = "";

    lastName = "";

    language = "";

    emailAddress = "";

    role = "";

    status = "";

    dateCreated = "";

    organizationId = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
