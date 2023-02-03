import { Gender, Language, Role, Status, Visibility } from "../common/enums";

export interface Player {
    authId: string | null;
    firstName: string;
    lastName: string;
    language: Language;
    emailAddress: string;
    role: Role;
    gender: Gender;
    dob: Date;
    visibility: Visibility;
    graduationTerm: string;
    image: string;
    status: Status;
    dateCreated: Date | null;
    organizationId: string;
}
