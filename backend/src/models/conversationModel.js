import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    type: { type: String, enum: ['oneToOne', 'group'], default: 'oneToOne' },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message',default:null }
}, { timestamps: true })

export const Conversation = mongoose.model('Conversation', conversationSchema)