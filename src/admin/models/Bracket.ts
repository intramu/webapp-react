// ! REVISIT - maybe there was are reason you had this, so leaving it here
// import { dayChoices } from "../../common/DayChoices";

export class BracketModel {
    bracketDayChoices: string[];

    // ! REVISIT
    // eslint-disable-next-line @typescript-eslint/ban-types
    bracketTimeSlots: Object[];

    bracketMaxSize: number;

    constructor() {
        this.bracketDayChoices = ["Monday"];
        this.bracketTimeSlots = [];
        this.bracketMaxSize = 0;
    }
}
