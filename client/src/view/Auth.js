import React from "react";
import LoginForm from "../Component/auth/LoginForm";
import RegisterForm from "../Component/auth/RegisterForm";

import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router";
// import AdminLoginForm from "../Component/admin/AdminLogin";

const Auth = ({ authRoute }) => {
    const {
        authState: { isAuthenticated, role },
    } = useContext(AuthContext);

    if (isAuthenticated && role === "USER") {
        return <Redirect to="/home"></Redirect>;
    } else if (!isAuthenticated && role === "USER") {
        return (
            <>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </>
        );
    } else {
        return (
            <>
                <Redirect to="/admin/post"></Redirect>
            </>
        );
    }
};

export default Auth;
