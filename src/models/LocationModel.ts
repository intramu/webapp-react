import { makeAutoObservable } from "mobx";

export class LocationModel {
    id = 0;

    address = "";

    city = "";

    state = "";

    zipCode = "";

    name = "";

    details = "";

    isMain = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
