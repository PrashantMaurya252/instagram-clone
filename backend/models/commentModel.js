import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    likesCount: { type: Number, default: 0 },
    repliesCount: { type: Number, default: 0 }
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema)