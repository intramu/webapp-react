import { makeAutoObservable } from "mobx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { BracketModel } from "./BracketModel";

dayjs.extend(utc);

export class DivisionModel {
    id = 0;

    name = "";

    type = "";

    level = "";

    status = "";

    maxTeamSize = 0;

    minWomenCount = 0;

    minMenCount = 0;

    startDate = dayjs.utc();

    endDate = dayjs.utc();

    registrationStartDate = dayjs.utc();

    registrationEndDate = dayjs.utc();

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
