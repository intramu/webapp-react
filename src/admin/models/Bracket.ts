import { dayChoices } from "../../common/DayChoices";

export class BracketModel {
    bracketDayChoices: string;
    bracketTimeSlots: Object[];
    bracketMaxSize: number;

    constructor() {
        this.bracketDayChoices = "Monday";
        this.bracketTimeSlots = [];
        this.bracketMaxSize = 0;
    }
}
