import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { MaterialTextInput } from "../../common/inputs";
import { unstyledButton } from "../../styles/player/buttons";
import { GreyButton } from "../../components/Buttons";
import { flexColumn } from "../../styles/player/common";
import { organizationStore } from "../_routes";

/** Organization settings view where they can make configurations */
export const Settings = observer(() => {
    const { organization } = organizationStore;

    // fetches organization on render
    useEffect(() => {
        organization.fetchOrganization();
    }, [organization]);

    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div>
            <h1>Settings</h1>
            <p>Heres what we have so far</p>
            {organization.name}

            <Formik
                enableReinitialize
                initialValues={organization}
                onSubmit={(values, { setSubmitting }) => {
                    organization.updateOrganization(values);
                    setSubmitting(false);
                }}>
                {(formik) => (
                    <>
                        <GreyButton type="button" onClick={() => setIsEditing((x) => !x)}>
                            {isEditing ? "Cancel" : "Edit"}
                        </GreyButton>
                        <Form css={[flexColumn, { width: "45%" }]}>
                            <MaterialTextInput
                                name="name"
                                label="Name"
                                disabled={!isEditing || formik.isSubmitting}
                            />
                            <MaterialTextInput
                                name="info"
                                label="Info"
                                multiline
                                disabled={!isEditing || formik.isSubmitting}
                            />
                            <MaterialTextInput
                                name="primaryContactEmail"
                                label="Primary Contact Email"
                                disabled={!isEditing || formik.isSubmitting}
                            />
                            <MaterialTextInput
                                name="studentContactEmail"
                                label="Student Contact Email"
                                disabled={!isEditing || formik.isSubmitting}
                            />
                            <br />
                            <span>
                                {`Approval Status: ${organization.approvalStatus || "Unknown"}`}
                            </span>
                            <br />
                            <span>{`Date Created: ${organization.dateCreated || "Unknown"}`}</span>

                            {/* opens location dropdown */}
                            <span>
                                Location{" "}
                                <button
                                    type="button"
                                    css={unstyledButton}
                                    onClick={() => setIsLocationOpen((current) => !current)}>
                                    <KeyboardArrowLeftIcon />
                                </button>
                            </span>
                            {isLocationOpen && (
                                <div css={flexColumn}>
                                    <MaterialTextInput
                                        name="address"
                                        label="Address"
                                        disabled={!isEditing || formik.isSubmitting}
                                    />
                                    <MaterialTextInput
                                        name="city"
                                        label="City"
                                        disabled={!isEditing || formik.isSubmitting}
                                    />
                                    <MaterialTextInput
                                        name="state"
                                        label="State"
                                        disabled={!isEditing || formik.isSubmitting}
                                    />
                                    <MaterialTextInput
                                        name="zipCode"
                                        label="Zip Code"
                                        disabled={!isEditing || formik.isSubmitting}
                                    />
                                </div>
                            )}

                            <Button type="submit">Update</Button>
                            <span>{organization.loadingState}</span>
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
});
