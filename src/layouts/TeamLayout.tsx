import React from "react";
import { Outlet } from "react-router-dom";

/** Needed by react router to create nested route
 * simply passes through outlet
 */
export function TeamLayout() {
    return <Outlet />;
}
