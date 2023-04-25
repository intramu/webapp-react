import { makeAutoObservable } from "mobx";

export class SimpleModel {
    name = "";

    age = 0;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
