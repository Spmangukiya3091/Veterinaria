import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Loader from "./Components/loader/Loader";
import useAuth from "./useAuth";
const ProtectedRoute = () => {
    const { data, isLoading, isError } = useAuth();

    if (isLoading) return <Loader />;

    return isError ? <Navigate to="/" /> : <Outlet context={{ user: data }} />;
};


export default ProtectedRoute;