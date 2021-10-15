import React from "react";
import LoginForm from "../Component/auth/LoginForm";
import RegisterForm from "../Component/auth/RegisterForm";

import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router";

const Auth = ({ authRoute }) => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Redirect to="/home"></Redirect>;
    } else {
        return (
            <>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </>
        );
    }
};

export default Auth;
