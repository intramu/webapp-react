/* eslint-disable no-bitwise */
// Will store information related to ui like, language and theme.
// Based off of mobx's suggestion.

import { makeAutoObservable } from "mobx";

export enum AlertType {
    error = "error",
    success = "success",
    warning = "warning",
    info = "info",
}

export class UIStore {
    message = "";

    alertType = AlertType.error;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setAlert(message: string, alertType: AlertType) {
        this.message = message;
        this.alertType = alertType;
    }

    dismissAlert() {
        this.message = "";
    }
}
