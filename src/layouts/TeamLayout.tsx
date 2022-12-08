import React from "react";
import { Outlet } from "react-router-dom";

export default function TeamLayout() {
    // can be used to create a common team layout inside of the common player layout
    return <Outlet />;
}
