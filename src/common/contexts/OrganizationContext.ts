import React from "react";
import { useLocalStore } from "mobx-react-lite";
import { OrganizationRootStore } from "../../models/stores/admin/OrganizationRootStore";

const OrganizationStoreContext = React.createContext(null);

// export const DataStoreProvider = ({ children }: any) => {
//     const store = useLocalStore(OrganizationRootStore);
// };
