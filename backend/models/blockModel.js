import mongoose from "mongoose";



const blockSchema = mongoose.Schema({
    blocker:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    blocked:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
},{timestamps:true})

blockSchema.index({blocker:1,blocked:1},{unique:true})

const BlockModel = mongoose.model('BlockModel',blockSchema)
export default BlockModel