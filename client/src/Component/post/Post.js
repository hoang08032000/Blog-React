import React from "react";

const Post = ({ post }) => {
    const { title, content } = post;

    return (
        <div className="post">
            <div className="title">{title}</div>
            <div className="content">{content}</div>
        </div>
    );
};

export default Post;
