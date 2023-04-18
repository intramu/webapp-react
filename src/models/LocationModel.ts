import { makeAutoObservable } from "mobx";

export class LocationModel {
    id = 0;

    address = "";

    city = "";

    state = "";

    zipCode = "";

    name = "";

    details = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
