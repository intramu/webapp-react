import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCreateTeam } from "../common/api";

export default function CreateTeam() {
    const initialState = {
        name: "",
        image: "",
        visibility: "PRIVATE",
        sport: "",
        playerId: "",
    };

    const [team, setTeam] = useState(initialState);
    const [responseMessage, setResponseMessage] = useState("");
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (e: any) => {
        setTeam({
            ...team,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const token = await getAccessTokenSilently();
            if (!user) {
                throw new Error("User not defined");
            }
            // ! REVISIT - determine how to handle no sub
            team.playerId = user.sub ?? "";
            // api call
            const response = await apiCreateTeam(token, team);
            if (response.data.code < 1) {
                setResponseMessage("Error creating team");
                throw new Error("Error creating team");
            }
        } catch (error) {
            console.log(error);
        }
        setResponseMessage("Team was created successfully");
        setTimeout(() => {
            navigate("/team");
        }, 2000);
    };

    return (
        <main>
            <h1>Team Creator</h1>
            <form>
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    required
                    value={team.name}
                    onChange={handleInputChange}
                />
                <br />
                <label>Image</label>
                <input
                    name="image"
                    type="text"
                    required
                    value={team.image}
                    onChange={handleInputChange}
                />
                <br />
                <label>Visbility</label>
                <select name="visibility" required onChange={handleInputChange}>
                    <option value="PRIVATE">Private</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </select>
                <br />
                <label>Sport</label>
                <input
                    name="sport"
                    type="text"
                    required
                    value={team.sport}
                    onChange={handleInputChange}
                />
                <br />
                <label>
                    There should be a option here to choose a league just not sure how to display
                    that
                </label>
                <br />
            </form>

            <button onClick={handleSubmit}>Create</button>

            <h1>{responseMessage || ""}</h1>
        </main>
    );
}
