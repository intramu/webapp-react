export interface IJoinRequest {
    authId: string;
    teamId: number;
    requestingPlayerFullName: string;
    timeSent: Date;
    expirationTime: Date;
}
