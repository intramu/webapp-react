import dayjs from "dayjs";

export interface INewContestGame {
    gameDate: dayjs.Dayjs | null;
    notes: string;
    location: number;
    homeTeam: number;
    awayTeam: number;
    bracket: number;
}
