import { IBracket } from "./IBracket";

export interface IDivision {
    id: number;
    name: string | null;
    type: string | null;
    level: string | null;
    maxTeamSize: number;
    minWomenCount: number | null;
    minMenCount: number | null;
    brackets: IBracket[];
    leagueId: number;
}
