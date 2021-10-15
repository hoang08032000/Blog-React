import axios from "axios";
import { createContext, useReducer } from "react";
import { PostReducer } from "../Reducer/PostReducer";
import {
    CREATE_POST,
    GET_POST,
    GET_POST_FAIL,
    UPDATE_POST,
} from "../Reducer/Types";
import { apiUrl } from "./Contansts";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    //state
    const [postState, dispatch] = useReducer(PostReducer, {
        posts: [],
    });

    // Get posts true
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

    // Get post false
    const getPostsFalse = async () => {
        try {
            const res = await axios.get(`${apiUrl}/post/getPost`);
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
            console.log(res.data);
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

    /// Approve Post
    const approvePost = async (id) => {
        try {
            const res = await axios.put(`${apiUrl}/post/${id}`);
            if (res.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: res.data.posts,
                });
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // Delete post
    const deletePost = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/post/${id}`);
            if (res.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: res.data.posts,
                });
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    const PostContextData = {
        postState,
        getPosts,
        createPost,
        getPostsFalse,
        approvePost,
        deletePost,
    };

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
