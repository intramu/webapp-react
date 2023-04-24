import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { newGetRequest, newPatchRequest, newPostRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { result } from "../utilities/modelResult";

interface PlayerModelProps {
    authId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    gender: string;
    language: string;
    dob: dayjs.Dayjs;
    graduationTerm: string;
    visibility: string;
    image: string;
    status: string;
    dateCreated: dayjs.Dayjs;
}

interface SubmitProps extends Omit<PlayerModelProps, "dob" | "dateCreated"> {
    dob: string;
    dateCreated: string;
}

export class PlayerModel {
    authId = "";

    firstName = "";

    lastName = "";

    emailAddress = "";

    gender = "";

    language = "";

    dob = dayjs(null);

    graduationTerm = "";

    visibility = "";

    image = "";

    status = "";

    dateCreated = dayjs(null);

    // request variables
    error = "";

    state = "pending";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    *fetchPlayer() {
        this.state = "pending";
        this.error = "";

        const response = yield* result(newGetRequest<PlayerModel>("/players"));
        // console.log(response);

        if (isErrorResponse(response)) {
            this.state = "done";
            this.error = response.errorMessage;
            return;
        }

        this.construct(response);
        this.state = "success";
    }

    *editPlayer(player: PlayerModel) {
        this.state = "pending";
        this.error = "";
        const response = yield* result(
            newPatchRequest<PlayerModel, PlayerModel>("/players", player)
        );

        if (isErrorResponse(response)) {
            this.state = "done";
            this.error = response.errorMessage;
            return;
        }

        this.construct(response);
        this.state = "success";
    }

    tryEditPlayer = (player: PlayerModel) => {
        this.editPlayer(player);
    };

    *createPlayer(orgId: string) {
        this.state = "pending";
        this.error = "";

        const response = yield* result(
            newPostRequest<PlayerModel, SubmitProps>(`/organizations/${orgId}/players`, {
                authId: this.authId,
                firstName: this.firstName,
                lastName: this.lastName,
                emailAddress: this.emailAddress,
                gender: this.gender,
                language: this.language,
                dob: dayjs(this.dob).format("YYYY-MM-DD"),
                graduationTerm: this.graduationTerm,
                visibility: this.visibility,
                image: this.image,
                status: this.status,
                dateCreated: this.dateCreated.toISOString(),
            })
        );

        if (isErrorResponse(response)) {
            this.state = "done";
            this.error = response.errorMessage;
            return;
        }

        this.construct(response);
        this.state = "success";
    }

    construct(props: Partial<PlayerModelProps>) {
        const {
            authId = "",
            firstName = "",
            lastName = "",
            emailAddress = "",
            gender = "",
            status = "",
            language = "",
            visibility = "",
            dob = dayjs(new Date()),
            image = "",
            graduationTerm = "",
            dateCreated = dayjs(new Date()),
        } = props;

        this.authId = authId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.gender = gender;
        this.status = status;
        this.visibility = visibility;
        this.language = language;
        this.dob = dayjs(dob);
        this.graduationTerm = graduationTerm;
        this.image = image;
        this.dateCreated = dateCreated;
    }

    formikToPlayerModel(player: PlayerModel) {
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
}
