import { DivisionModel } from "./Division";

export class LeagueModel {
    leagueName: string;

    leagueSport: string;

    leagueStartDate: string;

    leagueEndDate: string;

    leagueDetails: string;

    leagueLinks: string;

    leagueSetsDates: boolean;

    divisions: DivisionModel[];

    constructor() {
        this.leagueName = "";
        this.leagueSport = "";
        this.leagueStartDate = "";
        this.leagueEndDate = "";
        this.leagueDetails = "";
        this.leagueLinks = "";
        this.leagueSetsDates = false;
        this.divisions = [new DivisionModel()];
    }
}
