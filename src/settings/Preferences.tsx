import React, { useState } from "react";
import { Formik, Form } from "formik";
import { FormGroup, Input, Label } from "reactstrap";

import { TextInputBootstrap } from "../common/inputs";

function Preferences() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div style={{ marginTop: "20px" }}>
            <h5>
                <u>Preferences</u>
            </h5>

            {/* formik is here in case more preferences get added */}
            <Formik
                initialValues={{
                    darkMode: "off",
                }}
                onSubmit={(values) => {
                    // alert(values);
                }}>
                <Form>
                    <FormGroup switch>
                        <Input
                            type="switch"
                            checked={darkMode}
                            onClick={() => setDarkMode((v) => !v)}
                        />
                        <Label>Dark Mode</Label>
                    </FormGroup>
                </Form>
            </Formik>
        </div>
    );
}

export default Preferences;
