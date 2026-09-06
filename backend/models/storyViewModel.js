import mongoose from "mongoose";


const storyViewSchema = mongoose.Schema({
    story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
    viewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    viewedAt: { type: Date, default: Date.now() }
}, { timestamps: true })

storyViewSchema.index({ story: 1, viewer: 1 }, { unique: true })

const StoryView = mongoose.model('StoryView', storyViewSchema)
export default StoryView