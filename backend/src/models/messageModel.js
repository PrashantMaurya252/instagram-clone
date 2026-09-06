import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ['text', 'audio', 'image', 'video', 'sticker'], default: 'text' },
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    isDeleted: { type: Boolean, default: false },
    readBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]

}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema)