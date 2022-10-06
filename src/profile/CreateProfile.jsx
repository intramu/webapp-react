import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import instance from "../endpoint";
import { useAuth0 } from "@auth0/auth0-react";
import jwtDecode from "jwt-decode";

export default function CreateProfile() {
    const initialState = {
        id: "",
        firstName: "",
        lastName: "",
        gender: "male",
        language: "english",
        graduationTerm: "",
        dateOfBirth: "",
        profileVisibility: "private",
        profileCompletionStatus: "Incomplete",
    };
    const [profile, setProfile] = useState(initialState);
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    const token = urlParams.get("token");

    const navigate = useNavigate();

    const getToken = async () => {
        const decoded = jwtDecode(token);
        return decoded;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // console.log(profile);
        // console.log(value);
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleFormSubmit = async () => {
        try {
            const token = await getToken();
            setProfile((profile.id = token.sub));

            // const response = await instance.post("/createsecprofile", profile);
            // if (response.status === 200) {
            //     console.log(response);
            //     window.location.href = `https://dev-5p-an07k.us.auth0.com/continue?state=${state}`;
            // } else {
            // }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSkipSubmit = () => {
        console.log("skipping");
        navigate("/dashboard");
    };

    return (
        <div>
            <h1>Create Profile</h1>
            <h3>Make sure to finish creating your profile</h3>
            <form>
                {/* First Name Input */}
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Noah"
                />
                <br />

                {/* Last Name Input */}
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Roerig"
                />
                <br />

                {/* Gender Input */}
                <label>Gender:</label>
                <label htmlFor="male">Male </label>
                <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={profile.gender === "male"}
                    onChange={handleInputChange}
                />

                <label htmlFor="female">Female </label>
                <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={profile.gender === "female"}
                    onChange={handleInputChange}
                />
                <label htmlFor="apachehelicopter">Apache Helicopter </label>
                <input
                    type="radio"
                    name="gender"
                    id="apachehelicopter"
                    value="apachehelicopter"
                    checked={profile.gender === "apachehelicopter"}
                    onChange={handleInputChange}
                />
                <br />

                {/* Language Input */}
                <label htmlFor="">Language:</label>
                <select name="language" id="language" onChange={handleInputChange} required>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="nigerian">Nigerian</option>
                </select>
                <br />

                {/* Graduation Input */}
                <label htmlFor="">Graduation Term:</label>
                <select
                    name="graduationTerm"
                    id="graduationTerm"
                    onChange={handleInputChange}
                    required>
                    <option value="fall2022">Fall 2022</option>
                    <option value="spring2023">Spring 2023</option>
                    <option value="fall2023">Fall 2023</option>
                </select>
                <br />

                {/* Date of Birth Input */}
                <label htmlFor="dateOfBirth">Date Of Birth: </label>
                <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={profile.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    placeholder="02/21/2001"
                />
                <br />

                {/* Profile Visibility Input */}
                <label htmlFor="profileVisibility">Profile Visibility: </label>
                <select
                    name="profileVisibility"
                    id="profileVisibility"
                    onChange={handleInputChange}
                    required>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <br />

                <label>Profile Status: {profile.profileStatus}</label>
            </form>
            <button id="finishButton" onClick={handleFormSubmit}>
                Finish
            </button>
            <button id="skipButton" onClick={handleSkipSubmit}>
                Skip
            </button>
        </div>
    );
}
