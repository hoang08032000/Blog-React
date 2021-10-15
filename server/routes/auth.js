require("dotenv").config();
const express = require("express");
const argon2 = require("argon2");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

// @@route GET api/auth/
// @@desc Check user login
// @@access Public
router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "Người dùng không tồn tại" });
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @@route POST api/auth/register
// @@desc Register user
// @@access Public
router.post("/register", async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Bạn cần nhập đầy đủ thông tin!",
        });
    }
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Tài khoản đã được sử dụng!",
            });
        }
        if (password === confirmPassword) {
            const hashedPass = await argon2.hash(password);

            const newUser = new User({
                username,
                password: hashedPass,
            });

            await newUser.save();

            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN
            );

            res.json({
                success: true,
                message: "Tạo tài khoản thành công!",
                accessToken,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu xác thực không đúng!",
            });
        }
    } catch (error) {
        console.log(error);
        res.json(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @@route POST api/auth/login
// @@desc Login user
// @@access Public

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Bạn cần nhập đầy đủ thông tin!",
        });
    }
    try {
        const user = await User.findOne({ username });
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
