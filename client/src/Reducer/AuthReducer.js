import { SET_AUTH } from "./Types";

export const AuthReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, user },
    } = action;

    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated,
                user,
            };

        default:
            return state;
    }
};
