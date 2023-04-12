import React from "react";
import { observer } from "mobx-react-lite";
import { OrganizationRootStore } from "../../models/stores/admin/OrganizationRootStore";

interface SettingsProps {
    store: OrganizationRootStore;
}

export const Settings = observer(({ store }: SettingsProps) => {
    return <div>store</div>;
});
