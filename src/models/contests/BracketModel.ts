import { makeAutoObservable } from "mobx";
import { TeamModel } from "../team/TeamModel";

export class BracketModel {
    id = 0;

    dayChoices: string[] = [];

    timeChoices = "";

    maxTeamAmount = 0;

    teams: TeamModel[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
