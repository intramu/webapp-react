import React, { useEffect, useState } from "react";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton";

function Settings() {
    const [developer, setDeveloper] = useState(false);
    const [token, setToken] = useState("");

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetch = async () => {
            const t = await getAccessTokenSilently();
            setToken(t);
        };
        fetch();
    }, [getAccessTokenSilently]);

    return (
        <>
            <h5>
                <u>Settings</u>
            </h5>

            {/* formik is here in case more preferences get added */}
            {/* <Formik
                initialValues={{
                    darkMode: true,
                }}
                onSubmit={(values) => {
                    // alert(values);
                }}>
                <Form>
                    <FormGroup switch>
                        <Input type="switch" name="darkMode" />
                        <Label>Dark Mode</Label>
                    </FormGroup>
                </Form>
            </Formik> */}
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch checked={developer} onChange={() => setDeveloper((b) => !b)} />
                    }
                    label="Developer Mode"
                />
            </FormGroup>
            <LogoutButton />
            {developer && (
                <div>
                    <h6>Developer Mode</h6>
                    <textarea value={token} readOnly />
                </div>
            )}
        </>
    );
}

export default Settings;
