import React from "react";
import Profile from "./Profile";
import Settings from "./Settings";

function ProfileSettings() {
    return (
        <div className="container">
            <h5>
                <u>Profile</u>
            </h5>
            <Profile />
            <Settings />
        </div>
    );
}

export default ProfileSettings;
