import { IDivision } from "./IDivision";

export interface ILeague {
    id: number;
    name: string | null;
    sport: string | null;
    divisions: IDivision[];
}
