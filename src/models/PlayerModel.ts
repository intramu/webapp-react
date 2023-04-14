import dayjs from "dayjs";
import { makeAutoObservable, runInAction } from "mobx";
import { newGetRequest, newPatchRequest, newPostRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { IPlayer } from "../interfaces/IPlayer";
import { Language } from "../utilities/enums/userEnum";
import { result } from "../utilities/modelResult";

interface PlayerModelProps {
    authId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    gender: string;
    language: string;
    dateOfBirth: string;
    graduationTerm: string;
    visibility: string;
    image: string;
    status: string;
    dateCreated: string;
}

export class PlayerModel {
    authId = "";

    firstName = "";

    lastName = "";

    emailAddress = "";

    gender = "";

    language = "";

    dob = dayjs(Date.now());

    graduationTerm = "";

    visibility = "";

    image = "";

    status = "";

    dateCreated = dayjs(Date.now());

    // request variables
    error = "";

    state = "pending";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchPlayer() {
        this.state = "pending";
        this.error = "";

        const response = yield* result(newGetRequest<IPlayer>("/players"));

        if (isErrorResponse(response)) {
            this.state = "done";
            this.error = response.errorMessage;
            return;
        }

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
        // this.dateCreated = response.dateCreated || dayjs(Date.now());

        this.state = "success";
    }

    *editPlayer(player: PlayerModel) {
        this.state = "pending";
        this.error = "";
        const response = yield* result(newPatchRequest<IPlayer, PlayerModel>("/players", player));

        if (isErrorResponse(response)) {
            this.state = "done";
            this.error = response.errorMessage;
            return;
        }

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
        // this.dateCreated = response.dateCreated || new Date();
        this.state = "success";
    }

    async createPlayer(orgId: string) {
        runInAction(() => {
            this.state = "pending";
            this.error = "";
        });

        console.log(orgId);

        const response = await newPostRequest<IPlayer, PlayerModelProps>(
            `/organizations/${orgId}/players`,
            {
                authId: this.authId,
                firstName: this.firstName,
                lastName: this.lastName,
                emailAddress: this.emailAddress,
                gender: this.gender,
                language: this.language,
                dateOfBirth: dayjs(this.dob).format("YYYY-MM-DD"),
                graduationTerm: this.graduationTerm,
                visibility: this.visibility,
                image: this.image,
                status: this.status,
                dateCreated: this.dateCreated.toISOString(),
            }
        );

        console.log(response);

        runInAction(() => {
            if (isErrorResponse(response)) {
                this.state = "done";
                this.error = response.errorMessage;
                return;
            }

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
            // this.dateCreated = response.dateCreated || dayjs(Date.now());

            this.state = "success";
        });
    }

    formikToPlayerModel(player: PlayerModel) {
        console.log("first", this.firstName);

        this.authId = player.authId;
        this.firstName = player.firstName;
        this.lastName = player.lastName;
        this.emailAddress = player.emailAddress;
        this.gender = player.gender;
        this.language = player.language;
        this.dob = player.dob;
        this.graduationTerm = player.graduationTerm;
        this.visibility = player.visibility;
        this.image = player.image;
        this.status = player.status;
        this.dateCreated = player.dateCreated;
    }

    // async fetchPlayerById() {}

    // convertDob(): Date {
    //     const newDate = new Date(this.dob);
    //     return newDate.toLocaleDateString("sv-SE");
    // }
}
