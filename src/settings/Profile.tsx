import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";

export default function Profile() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const getToken = async () => {
            setToken(await getAccessTokenSilently());
        };

        getToken();
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
