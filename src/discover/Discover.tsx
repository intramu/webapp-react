import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import DiscoverCard from "./DiscoverCard";

export default function Discover() {
    const tempTeamList = [
        {
            id: "someId1",
            name: "Affordable Christians",
            sport: "Soccer",
            wins: 12,
            ties: 2,
            losses: 1,
            roster: [
                {
                    authId: "fdsafsd",
                    firstName: "Noah",
                    lastName: "Roerig",
                    role: "CAPTAIN",
                    gender: "MALE",
                    status: "ACTIVE",
                    image: "https://solepurpose-images.s3.us-west-2.amazonaws.com/sharkProfile.png",
                },
                {
                    authId: "fdsafsd",
                    firstName: "Stevan",
                    lastName: "Perrino",
                    role: "PLAYER",
                    gender: "MALE",
                    status: "ACTIVE",
                    image: "https://solepurpose-images.s3.us-west-2.amazonaws.com/sharkProfile.png",
                },
            ],
            visibility: "PRIVATE",
            image: "https://solepurpose-images.s3.us-west-2.amazonaws.com/sharkProfile.png",
            sportsmanshipScore: "4.0",
            status: "ACTIVE",
        },
        {
            id: "someId1",
            name: "Affordable Christians",
            sport: "Soccer",
            wins: 12,
            ties: 2,
            losses: 1,
            roster: [
                {
                    authId: "fdsafsd",
                    firstName: "Noah",
                    lastName: "Roerig",
                    role: "CAPTAIN",
                    gender: "MALE",
                    status: "ACTIVE",
                    image: "https://solepurpose-images.s3.us-west-2.amazonaws.com/sharkProfile.png",
                },
            ],
            visibility: "PRIVATE",
            image: "https://solepurpose-images.s3.us-west-2.amazonaws.com/sharkProfile.png",
            sportsmanshipScore: "4.0",
            status: "ACTIVE",
        },
    ];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [teamList, setTeamList] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [responseMessage, setResponseMessage] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filterOptions, setFilterOptions] = useState({
        sport: "",
        name: "",
        visibility: "",
    });

    useEffect(() => {
        // get list of active teams from organization
    });

    return (
        <div style={{ padding: "10px" }}>
            <h1>Discover</h1>
            <h3>Discover new sports and teams to join</h3>
            <Row>
                {tempTeamList.map((team, index) => (
                    <DiscoverCard key={index} team={team} />
                ))}
            </Row>
        </div>
    );
}
