import { makeAutoObservable } from "mobx";
import { DivisionModel } from "./DivisionModel";

export class LeagueModel {
    id = 0;

    name = "";

    sport = "";

    divisions: DivisionModel[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    pushDivision() {
        this.divisions.push(new DivisionModel());
    }

    removeDivision(index: number) {
        this.divisions.splice(index, 1);
    }
}
