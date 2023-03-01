import React, { useState } from "react";
import { Formik } from "formik";
import { Form as ReactForm, FormGroup, Input, Label } from "reactstrap";

import { TextInputBootstrap } from "../common/inputs";

function Preferences() {
    const [developer, setDeveloper] = useState(false);

    return (
        <div style={{ marginTop: "20px" }}>
            <h5>
                <u>Preferences</u>
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
                </div>
            )}
        </div>
    );
}

export default Preferences;
