// Will store information related to ui like, language and theme.
// Based off of mobx's suggestion.

import { makeAutoObservable } from "mobx";

class UIStore {
    constructor() {
        makeAutoObservable(this);
    }
}
