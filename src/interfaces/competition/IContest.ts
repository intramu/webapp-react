import { ILeague } from "./ILeague";

export interface IContest {
    id: number;
    name: string;
    visibility: string;
    status: string;
    dateCreated: Date | null;
    startDate: Date | null;
    endDate: Date | null;
    playoff: boolean;
    playoffType: string;
    playoffSeedingType: string;
    contestType: string;
    leagues: ILeague[];
    organizationId: string;
}
