import React, { Suspense, useState } from "react";
import { createUseStyles } from "react-jss";

import useSWR from "../../common/hooks/useSWR";
import LeaguesList from "../../components/network/leagues/LeagueList";
import { IContest } from "../../interfaces/competition/IContest";

const useStyles = createUseStyles({});

export function Network() {
    const { data, error, isLoading } = useSWR<IContest[]>("network");

    const [isOpen, setIsOpen] = useState<boolean>(false);
    console.log(data);

    if (error) return <div>Error</div>;
    if (isLoading) return <div>Loading</div>;

    return (
        <>
            {/* <div className="content-container"> */}
            <span>
                Fall 2023 Term 2{" "}
                <input type="text" placeholder="Search for sports, team names, and more..." />
            </span>
            <Suspense fallback={<div>Loading...</div>}>
                {data?.map((contest, index) => (
                    <LeaguesList key={index} leagues={contest.leagues} />
                ))}
            </Suspense>

            {/* contests need to be addressed differently especially with seasons and terms */}
            {/* {data?.map((contest, index) => (
                <div key={index} className="container network-container">
                    <h1>{contest.name}</h1>
                    <button
                        style={{ position: "absolute", right: 0 }}
                        onClick={() => setIsOpen((x) => !x)}>
                        Toggle
                    </button>
                    {isOpen && <LeaguesList leagues={contest.leagues} />}
                </div>
            ))} */}
        </>
    );
}
