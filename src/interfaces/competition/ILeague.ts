import { IDivision } from "./IDivision";

export interface ILeague {
    id: number;
    name: string | null;
    sport: string | null;
    startDate: Date | null;
    endDate: Date | null;
    divisions: IDivision[];
}
