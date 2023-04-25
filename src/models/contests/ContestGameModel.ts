import { makeAutoObservable } from "mobx";
import dayjs from "dayjs";
import { LocationModel } from "../LocationModel";
import { TeamModel } from "../team/TeamModel";

export class ContestGameModel {
    id = 0;

    dateCreated = dayjs(null);

    gameDate: dayjs.Dayjs = dayjs(null);

    notes = "";

    scoreHome = 0;

    scoreAway = 0;

    statusHome = 0;

    statusAway = 0;

    location = new LocationModel();

    homeTeam = new TeamModel();

    awayTeam = new TeamModel();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
