import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Gender, Role, Status } from "../common/enums";
import { IPlayer } from "../interfaces/IPlayer";

export class RosterPlayer {
    authId = "";

    role = Role.PLAYER;

    firstName = "";

    lastName = "";

    gender = Gender.MALE;

    status = Status.ACTIVE;

    constructor() {
        makeAutoObservable(this);
    }

    updateRole(role: Role) {
        // I think api call will be here
        this.role = role;
    }
}
