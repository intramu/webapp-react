import { makeAutoObservable } from "mobx";
import { BracketModel } from "./BracketModel";

export class DivisionModel {
    id = 0;

    name = "";

    type = "";

    level = "";

    status = "";

    maxTeamSize = 0;

    minWomenCount = 0;

    minMenCount = 0;

    startDate = new Date();

    endDate = new Date();

    registrationStartDate = new Date();

    registrationEndDate = new Date();

    contestType = "";

    playoffType = "";

    seedingType = "";

    brackets: BracketModel[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    pushBracket() {
        this.brackets.push(new BracketModel());
    }

    removeBracket(index: number) {
        this.brackets.splice(index, 1);

        this.pushBracket.bind(this);
    }
}
