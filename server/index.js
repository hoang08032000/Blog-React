require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

// Connect MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x4wqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        );
        console.log("mongoose connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log("server started on port: " + PORT);
});
