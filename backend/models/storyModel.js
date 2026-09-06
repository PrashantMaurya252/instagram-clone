import mongoose from "mongoose";


const storySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    media: { type: mongoose.Schema.Types.ObjectId, ref: 'media', required: true },
    caption: { type: String },
    expiresAt: {
        type: Date,
        index: true,
        expireAfterSeconds: 0
    },
}, { timestamps: true })

const Story = mongoose.model('Story', storySchema)
export default Story