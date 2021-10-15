import { CREATE_POST, GET_POST, GET_POST_FAIL } from "./Types";

export const PostReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_POST:
            return {
                ...state,
                posts: payload,
            };
        case GET_POST_FAIL:
            return {
                ...state,
                posts: [],
            };

        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
            };

        default:
            return state;
    }
};
