import React, { useState } from "react";
import useSWR from "../../common/hooks/useSWR";
import LeaguesList from "../../components/network/leagues/LeagueList";
import { IContest } from "../../interfaces/competition/IContest";

function Network() {
    const { data, error, isLoading } = useSWR<IContest[]>("network");

    const [isOpen, setIsOpen] = useState<boolean>(false);
    console.log(data);

    if (error) return <div>Error</div>;
    if (isLoading) return <div>Loading</div>;

    return (
        <>
            <h1>Network</h1>

            {data?.map((contest, index) => (
                <div key={index} className="container network-container">
                    <h1>{contest.name}</h1>
                    <button
                        style={{ position: "absolute", right: 0 }}
                        onClick={() => setIsOpen((x) => !x)}>
                        Toggle
                    </button>
                    {/* {isOpen && <LeaguesList leagues={contest.leagues} />} */}
                </div>
            ))}
        </>
    );
}

export default Network;
