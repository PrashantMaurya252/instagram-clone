import { mongo } from "mongoose";


const bookmarkSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true }
}, { timestamps: true })

bookmarkSchema.index({ user: 1, post: 1 }, { unique: true })

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

export default Bookmark