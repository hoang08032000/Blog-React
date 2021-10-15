import React, { useContext, useEffect } from "react";
import { PostContext } from "../Context/PostContext";
import Post from "../Component/post/Post";

const Home = () => {
    //Context
    const {
        postState: { posts },
        getPosts,
    } = useContext(PostContext);

    // Start get all posts
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {posts.map((post) => {
                // console.log(post);
                return <Post key={post._id} post={post} />;
            })}
        </div>
    );
};

export default Home;
