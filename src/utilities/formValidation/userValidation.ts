import * as Yup from "yup";

/** Yup validation schemas for user forms */

export const finishProfileSchema = Yup.object().shape({
    player: Yup.object({
        firstName: Yup.string().min(2, "Too Short").max(30, "Too Long").required("Required"),
        lastName: Yup.string().min(2, "Too Short").max(40, "Too Long").required("Required"),
        language: Yup.string().required("Required"),
        gender: Yup.string().required("Required"),
        visibility: Yup.string().required("Required"),
        graduationTerm: Yup.string().required("Required"),
        dob: Yup.date().required("Required"),
    }),
    organizationId: Yup.string().uuid("Not in UUID format").required("Required"),
});
