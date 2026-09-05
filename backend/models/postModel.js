import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    caption:{type:String,default:''},
    image:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    likesCount:{type:Number,default:0},
    commentCount:{type:Number,default:0},
    savesCount:{type:Number,default:0}
},{timestamps:true})

export const Post = mongoose.model("Post",postSchema)