import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { profileEdit } from "../common/validationSchemas";
import TextInput from "../common/inputs";

const dummyProfileData = {
    firstName: "Noah",
    lastName: "Roerig",
    email: "NRoerig@my.gcu.edu",
    gender: "MALE",
    language: "ENGLISH",
    dob: "02/21/2001",
    graduationTerm: "Spring 2023",
    visibility: "PRIVATE",
};

function Profile() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState<string>();
    const [profile, setProfile] = useState(dummyProfileData);

    useEffect(() => {
        console.log("Profile Fetch");

        const getToken = async () => {
            setToken(await getAccessTokenSilently());
        };

        // const getProfileInfo = async () => {
        //     //todo: perform api request to fetch user data

        // };

        // getToken();
        // getProfileInfo();
    });

    // const editProfile = () => {};

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
                validationSchema={profileEdit}
                onSubmit={(values, { setSubmitting }) => {
                    alert(values);
                }}>
                <Form>
                    <div style={{ display: "flex", width: "50%" }}>
                        <TextInput label="First Name" name="firstName" type="text" />
                        <TextInput label="Last Name" name="lastName" type="text" />
                    </div>
                    <div style={{ display: "flex", width: "50%" }}>
                        <img src="/logo192.png" alt="other" />
                        <button style={{ height: "40px", margin: "auto" }}>Change Image</button>
                    </div>
                    <div style={{ display: "flex", width: "50%" }}>
                        <TextInput label="Email" name="email" type="email" />
                        <TextInput label="Gender" name="gender" type="text" />
                    </div>
                    <div style={{ display: "flex", width: "50%" }}>
                        <TextInput label="Language" name="language" type="text" />
                        <TextInput label="Date of Birth" name="dob" type="date" />
                    </div>

                    <div style={{ display: "flex", width: "50%" }}>
                        <h6 style={{ flex: 1 }}>Graduation Term:</h6>
                        <p style={{ flex: 1 }}>{profile.graduationTerm}</p>
                    </div>

                    <div style={{ display: "flex", width: "50%" }}>
                        <h6 style={{ flex: 1 }}>Visibility: </h6>
                        <p style={{ flex: 1 }}>{profile.visibility}</p>
                    </div>
                    <button type="submit">Save</button>
                </Form>
            </Formik>

            {/* <p>Here are all the current details we have</p>
            <ul>
                <li>Birthday: {user.birthdate}</li>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Token: {token}</li>
            </ul> */}
        </div>
    );
}

export default Profile;
