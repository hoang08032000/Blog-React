import axios from "axios";
import { createContext, useReducer } from "react";
import { PostReducer } from "../Reducer/PostReducer";
import { CREATE_POST, GET_POST, GET_POST_FAIL } from "../Reducer/Types";
import { apiUrl } from "./Contansts";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    //state
    const [postState, dispatch] = useReducer(PostReducer, {
        posts: [],
    });

    // Get posts
    const getPosts = async () => {
        try {
            const res = await axios.get(`${apiUrl}/post`);
            if (res.data.success) {
                dispatch({
                    type: GET_POST,
                    payload: res.data.posts,
                });
            }
        } catch (error) {
            dispatch({ type: GET_POST_FAIL });
        }
    };

    // Create post
    const createPost = async (newPost) => {
        try {
            const res = await axios.post(`${apiUrl}/post`, newPost);
            if (res.data.success) {
                dispatch({
                    type: CREATE_POST,
                    payload: res.data.newPost,
                });
            }
            return res.data;
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    const PostContextData = { postState, getPosts, createPost };

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
