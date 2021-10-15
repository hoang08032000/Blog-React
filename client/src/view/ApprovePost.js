import React, { useContext, useEffect } from "react";
import { PostContext } from "../Context/PostContext";
import Post from "../Component/post/Post";

const ApprovePost = () => {
    const {
        postState: { posts },
        getPostsFalse,
    } = useContext(PostContext);

    // Start get all posts
    useEffect(() => {
        getPostsFalse();
    }, []);
    
    return (
        <div>
            {posts.map((post) => {
                return <Post key={post._id} post={post} />;
            })}
        </div>
    );
};

export default ApprovePost;
