import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import NavBar from "../Layout/Navbar";
import CreatePost from "../Layout/CreatePost";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        authState: { isAuthenticated, role },
    } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated && role === "USER") {
                    return (
                        <>
                            <NavBar />
                            <CreatePost />
                            <Component {...rest} {...props} />{" "}
                        </>
                    );
                } else if (!isAuthenticated) {
                    return <Redirect to="/login" />;
                } else if (isAuthenticated && role === "ADMIN") {
                    return (
                        <>
                            <NavBar />
                            <Component {...rest} {...props} />
                        </>
                    );
                }
            }}
        />
    );
};
export default ProtectedRoute;
