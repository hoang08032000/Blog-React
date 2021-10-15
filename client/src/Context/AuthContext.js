import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import { AuthReducer } from "../Reducer/AuthReducer";

import setAuthToken from "../utils/setAuthToken";

import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./Contansts";
import { SET_AUTH } from "../Reducer/Types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        isAuthenticated: false,
        user: null,
    });

    // Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const res = await axios.get(`${apiUrl}/auth`);
            if (res.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: res.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: SET_AUTH,
                payload: { isAuthenticated: false, user: null },
            });
        }
    };

    useEffect(() => loadUser(), []);

    const loginUser = async (userForm) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, userForm);

            if (res.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    res.data.accessToken
                );
            }
            await loadUser();
            return res.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    const registerUser = async (userForm) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, userForm);

            if (res.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    res.data.accessToken
                );
            }
            await loadUser();
            return res.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: SET_AUTH,
            payload: { isAuthenticated: false, user: null },
        });
    };

    const AuthContextData = { loginUser, registerUser, authState, logoutUser };
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
