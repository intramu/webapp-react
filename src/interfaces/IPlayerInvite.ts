export interface IPlayerInvite {
    authId: string;
    teamId: number;
    requestingPlayerFullName: string;
    requestingTeamName: string;
    timeSent: Date;
    expirationTime: Date;
}
