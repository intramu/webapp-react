import { makeAutoObservable } from "mobx";

export class UserRootStore {
    constructor() {
        makeAutoObservable(this);
    }
}
