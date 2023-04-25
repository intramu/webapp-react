import { makeAutoObservable } from "mobx";
import dayjs from "dayjs";
import { ContestGameStatus } from "../../utilities/enums/competitionEnum";
import { LocationModel } from "../LocationModel";
import { TeamModel } from "../team/TeamModel";

export class ContestGameModel {
    id = 0;

    dateCreated = dayjs(null);

    gameDate: dayjs.Dayjs = dayjs(null);

    notes = "";

    scoreHome = 0;

    scoreAway = 0;

    statusHome = ContestGameStatus;

    statusAway = ContestGameStatus;

    location = new LocationModel();

    homeTeam = new TeamModel();

    awayTeam = new TeamModel();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
