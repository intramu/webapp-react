import { ExSport, Gender, Language, Role, Status, Visibility } from "../common/enums";

export interface IPlayer {
    authId: string;
    firstName: string;
    lastName: string;
    language: Language;
    emailAddress: string;
    gender: Gender;
    dob: string;
    visibility: Visibility;
    graduationTerm: string;
    image: string;
    status: Status;
    dateCreated: Date | null;
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
    role: Role;
    firstName: string;
    lastName: string;
    gender: string;
    status: string;
    image: string;
}
