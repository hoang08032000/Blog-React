import { SET_AUTH } from "./Types";

export const AuthReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, user, role },
    } = action;

    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated,
                user,
                role,
            };

        default:
            return state;
    }
};
