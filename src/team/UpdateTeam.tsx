import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUpdateTeam } from "../common/api";

export default function UpdateTeam() {
    const { state } = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [updatedTeam, setUpdatedTeam] = useState<any>(state);
    const { user, getAccessTokenSilently } = useAuth0();
    // console.log(updatedTeam.VISIBILITY);
    // updatedTeam.VISIBILITY.toLowerCase();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (e: any) => {
        setUpdatedTeam({
            ...updatedTeam,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        console.log("test");
        if (!user) {
            throw new Error("No user defined");
        }
        const token = await getAccessTokenSilently();
        // ! REVISIT - determine how to handle no sub
        const response = await apiUpdateTeam(token, user.sub ?? "", updatedTeam);
        console.log(response);
    };

    return (
        <div>
            <h1>Update Team</h1>
            <form>
                <label>Name</label>
                <input
                    name="NAME"
                    type="text"
                    required
                    value={updatedTeam.NAME}
                    onChange={handleInputChange}
                />
                <br />
                <label>Image</label>
                <input
                    name="IMAGE"
                    type="text"
                    required
                    value={updatedTeam.IMAGE}
                    onChange={handleInputChange}
                />
                <br />
                <label>Visbility</label>
                <select
                    value={updatedTeam.VISIBILITY}
                    name="VISIBILITY"
                    required
                    onChange={handleInputChange}>
                    <option value="PRIVATE">Private</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </select>
                <br />
                <label>Sport</label>
                <input
                    name="SPORT"
                    type="text"
                    required
                    value={updatedTeam.SPORT}
                    onChange={handleInputChange}
                />
            </form>
            <button onClick={handleSubmit}>Update</button>
        </div>
    );
}
