import { makeAutoObservable } from "mobx";
import { ContestModel } from "../contests/ContestModel";

export class ContestStore {
    contests: ContestModel[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
