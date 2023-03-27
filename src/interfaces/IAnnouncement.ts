export interface IAnnouncement {
    id: number;
    title: string;
    description: string;
    // the global flag specifies whether the announcement was from Intramu or the organization
    global: boolean;
    dateCreated: Date;
}
