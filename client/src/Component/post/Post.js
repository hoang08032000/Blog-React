import React, { useContext } from "react";
import { PostContext } from "../../Context/PostContext";

const Post = ({ post }) => {
    const { approvePost, deletePost } = useContext(PostContext);

    const { title, content, status, _id } = post;
    const style = status ? { display: "none" } : { display: "block" };

    // approve post
    const handleApprovePost = async () => {
        try {
            await approvePost(_id);
        } catch (error) {
            console.log(error);
        }
    };

    // delete post
    const handleDeletePost = async () => {
        try {
            await deletePost(_id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="post-container">
            <div className="post">
                <div className="title">{title}</div>
                <div className="content">{content}</div>
            </div>
            <div className="btn" style={style}>
                <input
                    type="button"
                    value="Duyệt"
                    className="approve-btn"
                    onClick={handleApprovePost}
                />
                <input
                    type="button"
                    value="Xóa"
                    className="delete-btn"
                    onClick={handleDeletePost}
                />
            </div>
        </div>
    );
};

export default Post;
