import { TeamRole } from "../utilities/enums/teamEnum";
import {
    Language,
    PlayerGender,
    PlayerStatus,
    PlayerVisibility,
} from "../utilities/enums/userEnum";

export interface IPlayer {
    authId: string;
    firstName: string;
    lastName: string;
    language: Language;
    emailAddress: string;
    gender: PlayerGender;
    dob: string;
    visibility: PlayerVisibility;
    graduationTerm: string;
    image: string;
    status: PlayerStatus;
    dateCreated: Date | null;
}

export interface INewPlayer {
    authId: string;
    firstName: string;
    lastName: string;
    language: string;
    emailAddress: string;
    gender: string;
    dob: string;
    visibility: string;
    graduationTerm: string;
    image: string;
    status: string;
    dateCreated: string;
}

export interface IPlayerEdit {
    authId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    gender: string;
    language: string;
    dob: string;
    graduationTerm: string;
    visibility: string;
}

export interface IRosterPlayer {
    authId: string;
    role: TeamRole;
    firstName: string;
    lastName: string;
    gender: string;
    status: string;
    image: string;
}
