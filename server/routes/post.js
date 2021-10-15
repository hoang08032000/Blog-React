const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

const Post = require("../models/Post");

// @@Router GET api/post
// @@desc get post true
// @@access Private
router.get("/", verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ status: true }).sort([
            ["createdAt", -1],
        ]);

        res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @@Router GET api/post
// @@desc get post false
// @@access Private
router.get("/getPost", verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ status: false }).sort([
            ["createdAt", -1],
        ]);

        res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @@Router POST api/post
// @@desc create post
// @@access Private

router.post("/", verifyToken, async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Bạn cần nhập đầy đủ thông tin!",
        });
    }
    try {
        const newPost = new Post({
            title,
            content,
            user: req.userId,
        });

        await newPost.save();

        res.json({ success: true, message: "Đăng bài thành công!", newPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @@Router POST api/post
// @@desc UPDATE post
// @@access Private
router.put("/:id", verifyToken, async (req, res) => {
    const id = req.params.id;

    try {
        const updatePost = await Post.findByIdAndUpdate(
            { _id: id },
            { status: true }
        );

        const posts = await Post.find({ status: false }).sort([
            ["createdAt", -1],
        ]);

        res.json({
            success: true,
            message: "Cập nhật bài đăng thành công!",
            posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @@Router POST api/post
// @@desc DELETE post
// @@access Private

router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id;

    try {
        await Post.findByIdAndDelete({ _id: id });

        const posts = await Post.find({ status: false }).sort([
            ["createdAt", -1],
        ]);

        res.json({
            success: true,
            message: "Xóa bài đăng thành công!",
            posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
module.exports = router;
