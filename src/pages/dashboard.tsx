import React, { useEffect } from "react";
import { IsLoadingHOC } from "../components/hoc/IsLoadingHOC";

function Dashboard(props: any) {
    const { setLoading } = props;

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 4000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            Main Dashboard Where the user will see all kinds of data about the next games and team
            stats.
            <h1>This route should be protected.</h1>
            <br />
        </div>
    );
}

export default IsLoadingHOC(Dashboard, "Loading...");
