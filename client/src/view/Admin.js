import React, { useContext } from "react";
import { Redirect } from "react-router";
import AdminLoginForm from "../Component/admin/AdminLogin";
import { AuthContext } from "../Context/AuthContext";

const Admin = () => {
    const {
        authState: { isAuthenticated, role },
    } = useContext(AuthContext);

    if (isAuthenticated && role === "ADMIN") {
        return <Redirect to="/admin/post" />;
    } else {
        return <AdminLoginForm />;
    }
};

export default Admin;
