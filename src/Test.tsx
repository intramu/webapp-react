import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import React, { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import fetchData from "./common/api/fetchData";
// import { getRequest } from "./common/api/testFunctions";
import { TeamModel } from "./models/team/TeamModel";
import { SimpleModel } from "./models/SimpleModel";
import { Input } from "./common/mobbinInput";

const resource = fetchData(`http://localhost:8080/api/v1/players/auth0|62760b4733c477006f82c56c`);
// const test = getRequest("", "");

type Item = {
    name: string;
    age: string;
};

interface test {
    name: string;
    age: number;
}

export const Test = observer(() => {
    const [simpleModel] = useState(() => new SimpleModel());

    const obj1: Item = {
        age: "age",
        name: "name",
    };

    // const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;

    //     type i1 = (typeof simpleModel)[keyof SimpleModel];
    //     // eslint-disable-next-line dot-notation
    //     simpleModel[name as keyof test] = value;

    //     console.log(SimpleModel.prototype);
    // };

    return (
        <form>
            <input
                type="text"
                value={simpleModel.name}
                onChange={(e) => {
                    simpleModel.name = e.target.value;
                    // changeValue(e);
                }}
            />
        </form>
    );
});

const UserWelcome = observer(() => {
    // const userDetails = resource.read();
    const [team] = useState(() => new TeamModel());

    useEffect(() => {
        const fetch = async () => {
            team.fetchTeam(17);
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
