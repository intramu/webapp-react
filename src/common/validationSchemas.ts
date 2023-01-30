import * as Yup from "yup";
import { Gender } from "./enums";

export const profileEdit = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Not in email format").required("Required"),
    gender: Yup.mixed().oneOf([Gender.MALE, Gender.FEMALE], "Must be male or female"),
});
