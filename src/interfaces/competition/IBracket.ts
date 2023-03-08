import { ITeam } from "../ITeam";

export interface IBracket {
    id: number;
    dayChoices: string[];
    timeChoices: ITimeRange[];
    maxTeamAmount: number;
    teams: ITeam[];
    divisionId: number;
}

export interface ITimeRange {
    startTime: Date;
    endTime: Date;
}
