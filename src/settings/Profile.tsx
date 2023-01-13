import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";

const dummyProfileData = {
    firstName: "Noah", 
    lastName: "Roerig",
    email: "NRoerig@my.gcu.edu",
    gender: "MALE",
    language: "ENGLISH",
    dob: "02/21/2001",
    graduationTerm: "Spring 2023",
    visibility: "PRIVATE"
}

export default function Profile() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState<string>();
    const [profile, setProfile] = useState(dummyProfileData);

    useEffect(() => {
        console.log("Profile Fetch");
        
        const getToken = async () => {
            setToken(await getAccessTokenSilently());
        };

        const getProfileInfo = async() => {
            //todo: perform api request to fetch user data
        }

        getToken();
        getProfileInfo();
    });

    const editProfile = () => {        
    }

    if (!user) {
        return <div />;
    }

    return (
        <div>
            <h5>
                <u>Profile</u>
            </h5>
            <Formik
                initialValues={profile}
                validationSchema={}
                />
            <p>Here are all the current details we have</p>
            <ul>
                <li>Birthday: {user.birthdate}</li>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Token: {token}</li>
            </ul>
        </div>
    );
}
