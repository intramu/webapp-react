import { BracketModel } from "./Bracket";

export class DivisionModel {
    divisionName: string;
    divisionType: string;
    divisionLevel: string;
    divisionStartDate: string;
    divisionEndDate: string;
    brackets: BracketModel[];

    constructor() {
        this.divisionName = "";
        this.divisionType = "";
        this.divisionLevel = "";
        this.divisionStartDate = "";
        this.divisionEndDate = "";
        this.brackets = [new BracketModel()];
    }
}
