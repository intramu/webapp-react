import {
    ContestType,
    DivisionLevel,
    DivisionStatus,
    DivisionType,
    PlayoffSeedingType,
    PlayoffType,
} from "../../utilities/enums/competitionEnum";
import { IBracket } from "./IBracket";

export interface IDivision {
    leagueId: number;
    id: number;
    name: string | null;
    type: DivisionType | null;
    level: DivisionLevel | null;
    status: DivisionStatus | null;
    maxTeamSize: number;
    minWomenCount: number;
    minMenCount: number;
    startDate: Date | null;
    endDate: Date | null;
    registrationStartDate: Date | null;
    registrationEndDate: Date | null;
    contestType: ContestType | null;
    playoffType: PlayoffType | null;
    playoffSeedingType: PlayoffSeedingType | null;
    brackets: IBracket[];
}
