import { makeAutoObservable } from "mobx";
import { LeagueModel } from "./LeagueModel";

export class LeagueStore {
    leagues: LeagueModel[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        // makeObservable(this, {
        //     leagues: observable,
        //     pushLeague: action,
        //     removeLeague: action,
        // });
    }

    pushLeague() {
        this.leagues.push(new LeagueModel());
    }

    removeLeague(index: number) {
        this.leagues.splice(index, 1);
    }
}
