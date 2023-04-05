import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import React, { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import fetchData from "./common/api/fetchData";
import { getRequest } from "./common/api/testFunctions";
import { TestTeamModel } from "./models/TestTeamModel";

const resource = fetchData(`http://localhost:8080/api/v1/players/auth0|62760b4733c477006f82c56c`);
const test = getRequest("", "");

export function Test() {
    return (
        <ErrorBoundary fallback={<div>Sorry an error occurred</div>}>
            <Suspense fallback={<p>loading...</p>}>
                <UserWelcome />
            </Suspense>
        </ErrorBoundary>
    );
}

const UserWelcome = observer(() => {
    // const userDetails = resource.read();
    const [team] = useState(() => new TestTeamModel());

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetch = async () => {
            const token = await getAccessTokenSilently();
            team.fetchTeam(17, token);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <p>Welcome {team.id}</p>
            {/* <p>Welcome {details.id}</p> */}
        </div>
    );
});

// framer motion
