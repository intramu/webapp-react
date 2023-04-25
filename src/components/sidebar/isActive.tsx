import { Location } from "react-router-dom";

export const isActive = (location: Location, setActive: (x: string) => void) => {
    const doesInclude = (path: string) => !!location.pathname.includes(path);

    if (doesInclude("dashboard")) {
        setActive("dash");
        return;
    }
    if (doesInclude("teams")) {
        setActive("teams");
        return;
    }
    if (doesInclude("network")) {
        setActive("network");
        return;
    }
    if (doesInclude("help")) {
        setActive("help");
        return;
    }
    setActive("");
};
