import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextInputBootstrap } from "../common/inputs";

function Preferences() {
    const [darkMode, setDarkMode] = useState("OFF");

    return (
        <div>
            <h5>
                <u>Preferences</u>
            </h5>

            <Formik
                initialValues={{
                    darkMode: "off",
                }}
                onSubmit={(values) => {
                    alert(values);
                }}>
                <Form>
                    <div style={{ display: "flex", width: "50%" }}>
                        <h6>Dark Mode</h6>

                        <label>Off</label>
                        <input
                            name="darkMode"
                            type="radio"
                            value="Off"
                            checked={darkMode === "OFF"}
                            onChange={() => setDarkMode("OFF")}
                        />

                        <label>On</label>
                        <input
                            name="darkMode"
                            type="radio"
                            value="ON"
                            checked={darkMode === "ON"}
                            onChange={() => setDarkMode("ON")}
                        />
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Preferences;
