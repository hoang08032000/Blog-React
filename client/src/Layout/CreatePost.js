import React, { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import AlertMessage from "./AlertMessage";

const CreatePost = () => {
    const [alert, setAlert] = useState(null);

    const { createPost } = useContext(PostContext);

    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
    });

    const { title, content } = newPost;

    //onChangeForm
    const onChangeForm = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    // addPost
    const addNewPost = async (e) => {
        e.preventDefault();
        try {
            const addData = await createPost(newPost);
            if (!addData.success) {
                setAlert({ type: "danger", message: addData.message });
                setTimeout(() => setAlert(null), 5000);
            }

            setAlert({ type: "success", message: addData.message });
            setTimeout(() => setAlert(null), 5000);

            setNewPost({ title: " ", content: " " });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="create-post" onSubmit={addNewPost}>
            <h2>Đăng bài</h2>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Nhập tiêu đề"
                    name="title"
                    value={title}
                    onChange={onChangeForm}
                />
            </div>
            <div className="input-wrapper">
                <textarea
                    name="content"
                    placeholder="Nội dung"
                    value={content}
                    onChange={onChangeForm}
                ></textarea>
            </div>
            <AlertMessage info={alert} />
            <div className="submit">
                <input className="submit-btn" type="submit" value="Đăng bài" />
            </div>
        </form>
    );
};

export default CreatePost;
