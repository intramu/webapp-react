import React, { useState } from "react";
import { Formik } from "formik";
import { Form as ReactForm, FormGroup, Input, Label } from "reactstrap";
import LogoutButton from "../../components/LogoutButton";

// import { TextInputBootstrap } from "../common/inputs";

function Settings() {
    const [developer, setDeveloper] = useState(false);

    return (
        <div style={{ marginTop: "20px" }}>
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

            <ReactForm>
                <FormGroup switch>
                    <Input
                        type="switch"
                        checked={developer}
                        onChange={() => setDeveloper(!developer)}
                        // onClick={() => setDeveloper(!developer)}
                    />
                    <Label>Developer Mode</Label>
                </FormGroup>
            </ReactForm>

            {developer && (
                <div>
                    <h6>Developer Mode</h6>
                    <LogoutButton />
                </div>
            )}
        </div>
    );
}

export default Settings;
