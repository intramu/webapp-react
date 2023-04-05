import { makeAutoObservable, runInAction } from "mobx";
import { newGetRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { IPlayer } from "../interfaces/IPlayer";
import { Language } from "../utilities/enums/userEnum";

export class PlayerModel {
    authId = "";

    firstName = "";

    lastName = "";

    emailAddress = "";

    gender = "";

    language = "";

    dob = new Date();

    graduationTerm = "";

    visibility = "";

    image = "";

    status = "";

    dateCreated = new Date();

    // request variables
    error = "";

    state = "";

    constructor() {
        makeAutoObservable(this);
    }

    async fetchPlayer() {
        // this.state = "pending";
        // this.error = "";

        const response = await newGetRequest<IPlayer>("/players");
        if (isErrorResponse(response)) {
            // handle error
            // this.error = response.errorMessage
            return;
        }

        runInAction(() => {
            this.authId = response.authId;
            this.firstName = response.firstName;
            this.lastName = response.lastName;
            this.emailAddress = response.emailAddress;
            this.gender = response.gender;
            this.language = response.language;
            // this.dob = this.convertDob();
            this.graduationTerm = response.graduationTerm;
            this.visibility = response.visibility;
            this.image = response.image;
            this.status = response.status;
            this.dateCreated = response.dateCreated || new Date();
        });
    }

    // async editPlayer() {}

    // async createPlayer() {}

    // async fetchPlayerById() {}

    // convertDob(): Date {
    //     const newDate = new Date(this.dob);
    //     return newDate.toLocaleDateString("sv-SE");
    // }
}
