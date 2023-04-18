import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Formik } from "formik";
import LogoutButton from "../LogoutButton";

// import { TextInputBootstrap } from "../common/inputs";

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

            {/* <ReactForm>
                <FormGroup switch>
                    <Input
                        type="switch"
                        checked={developer}
                        onChange={() => setDeveloper(!developer)}
                        // onClick={() => setDeveloper(!developer)}
                    />
                    <Label>Developer Mode</Label>
                </FormGroup>
                <LogoutButton />
            </ReactForm> */}
            {developer && (
                <div>
                    <h6>Developer Mode</h6>
                    <p>{token}</p>
                </div>
            )}
        </>
    );
}

export default Settings;
