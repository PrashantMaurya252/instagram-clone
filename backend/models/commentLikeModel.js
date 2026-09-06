import mongoose from "mongoose";


const commentLikeSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    comment:{type:mongoose.Schema.Types.ObjectId,ref:'comment',required:true}
},{timestamps:true})

commentLikeSchema.index({user:1,comment:1},{unique:true})

const CommentLike = mongoose.model('CommentLike',commentLikeSchema)

export default CommentLike