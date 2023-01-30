import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

export default function Profile() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const getToken = async () => {
            setToken(await getAccessTokenSilently());
        };

        getToken();
    });

    if (!user) {
        return <div />;
    }

    return (
        <div>
            <h1>Profile</h1>
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