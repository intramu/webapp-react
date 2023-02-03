import { Visibility } from "../common/enums";
import { PlayerTeam } from "./Player";

export interface Team {
    id: number;
    name: string;
    wins: number;
    ties: number;
    losses: number;
    image: string;
    visibility: string;
    sport: string;
    dateCreated: Date;
    sportsmanshipScore: number | null;
    status: string;
    maxTeamSize: number | null;
    players: PlayerTeam[];
    organizationId: string;
    bracketId: number;
}
