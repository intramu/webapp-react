import { makeAutoObservable } from "mobx";

export class BracketModel {
    id = 0;

    dayChoices: string[] = [];

    timeChoices = [];

    maxTeamAmount = 0;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
