export interface IJoinRequest {
    player_auth_id: string;
    teamId: number;
    requesting_player_full_name: string;
    timeSent: Date;
    expirationTime: Date;
}
