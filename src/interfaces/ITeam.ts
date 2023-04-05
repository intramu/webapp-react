import { Gender, Sport, Visibility } from "../common/enums";
import { IRosterPlayer } from "./IPlayer";

export interface ITeam {
    id: number;
    name: string;
    wins: number;
    ties: number;
    losses: number;
    image: string;
    visibility: string;
    // sport: string;
    gender: string;
    dateCreated: Date;
    sportsmanshipScore: number | null;
    status: string;
    maxTeamSize: number | null;
    players: IRosterPlayer[];
    // organizationId: string;
    // bracketId: number;
}

export interface ITeamNew {
    name: string;
    image: string;
    visibility: Visibility;
    sport: Sport;
}
