import {
    CompetitionSeason,
    CompetitionStatus,
    CompetitionVisibility,
} from "../../utilities/enums/competitionEnum";
import { ILeague } from "./ILeague";

export interface IContest {
    id: number;
    name: string;
    visibility: CompetitionVisibility;
    status: CompetitionStatus;
    season: CompetitionSeason;
    term: number;
    year: string;
    date_created: Date;
    leagues: ILeague[];
    organization_id: string;
}
