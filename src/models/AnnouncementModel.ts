import { makeAutoObservable } from "mobx";
import { getRequest } from "../common/functions/axiosRequests";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { IAnnouncement } from "../interfaces/IAnnouncement";

class AnnouncementModel {
    organizationAnnouncements: IAnnouncement[] = [];

    globalAnnouncements: IAnnouncement[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAllAnnouncements(orgId: string, token: string) {
        const announcements = await getRequest<IAnnouncement[]>(`/announcements`, token);
        if (isErrorResponse(announcements)) {
            return;
        }
        this.organizationAnnouncements = announcements.filter((x) => !x.global);
    }
}
