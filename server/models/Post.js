const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
});

module.exports = mongoose.model("posts", PostSchema);
