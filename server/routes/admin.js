require("dotenv").config();
const express = require("express");
const argon2 = require("argon2");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

// @@route POST api/auth/login
// @@desc Login user
// @@access Public

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password || username !== "admin") {
        return res.status(400).json({
            success: false,
            message: "Bạn cần nhập đầy đủ thông tin!",
        });
    }

    try {
        const user = await User.findOne({ username: "admin" });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Bạn nhập sai thông tin người dùng hoặc mật khẩu!",
            });
        }
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Bạn nhập sai thông tin người dùng hoặc mật khẩu!",
            });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN
        );
        const role = user.role;

        res.json({
            success: true,
            message: "Đăng nhập thành công!",
            accessToken,
            role,
        });
    } catch (error) {
        console.log(error);
        res.json(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

module.exports = router;
