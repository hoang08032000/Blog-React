import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import NavBar from "../Layout/Navbar";
import CreatePost from "../Layout/CreatePost";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    // if(isAuthenticated)

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <>
                        <NavBar />
                        <CreatePost />
                        <Component {...rest} {...props} />{" "}
                    </>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
