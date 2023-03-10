export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export enum Language {
    ENGLISH = "ENGLISH",
}

export enum Sport {
    SOCCER = "SOCCER",
    BASKETBALL = "BASKETBALL",
    FLAGFOOTBALL = "FLAGFOOTBALL",
}

export enum ExSport {
    CAPTAIN = "CAPTAIN",
    COCAPTAIN = "COCAPTAIN",
    PLAYER = "PLAYER",
}

// eslint-disable-next-line @typescript-eslint/no-namespace
// export namespace ExSport {
//     // export function promote(value: ExSport): string {
//     //     if (value === 0) {
//     //         return ExSport[value];
//     //     }
//     //     return ExSport[value - 1];
//     // }
//     export function promote(value: ExSport): ExSport {
//         const vals = Object.values(ExSport);

//         const index = vals.indexOf(value);
//         const next: ExSport = vals[index + 1];
//         // if (value === 0) {
//         //     return value;
//         // }
//         // return value - 1;
//     }

//     export function demote(value: ExSport): ExSport {
//         if (value === 2) {
//             return value;
//         }
//         return value + 1;
//     }
// }

export enum Role {
    CAPTAIN = "CAPTAIN",
    COCAPTAIN = "COCAPTAIN",
    PLAYER = "PLAYER",
    MASTER = "MASTER",
    WORKER = "WORKER",
}

export enum Visibility {
    PRIVATE = "PRIVATE",
    OPEN = "OPEN",
    CLOSED = "CLOSED",
}

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    INCOMPLETE = "INCOMPLETE",
    BANNED = "BANNED",
    GRADUATED = "GRADUATED",
    WAITING = "WAITING",
}

export enum TournamentType {
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE",
    ROUNDROBIN = "ROUND",
    PICKFORME = "PICKFORME",
}
export enum TournamentSeedType {
    POINTS = "POINTS",
    RANDOM = "RANDOM",
}

export enum TournamentStatus {
    NOTPLAYED = "NOTPLAYED",
    TOBEDETERMINED = "TOBEDETERMINED",
    WON = "WON",
    LOST = "LOST",
    FORFEIT = "FORFEIT",
    SUSPENDED = "SUSPENDED",
    WEATHER = "WEATHER",
    RESCHEDULED = "RESCHEDULED",
    OTHER = "OTHER",
}

export enum ContestType {
    POINTS = "POINTS",
}

export enum PlayoffSeedingType {
    CROSS = "CROSS",
    INDEPENDENT = "INDEPENDENT",
}

export enum DivisionType {
    MENS = "MENS",
    WOMENS = "WOMENS",
    COED = "COED",
}

export enum DivisionLevel {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
}
