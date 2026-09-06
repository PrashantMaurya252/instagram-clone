import mongoose from "mongoose";



const reportModelSchema = new mongoose.Schema({
    reporter:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    type:{type:String,enum:['user','post','comment','message','story'],default:'post'},
    reason:{type:String,required:true},
    targetId:{type:mongoose.Schema.Types.ObjectId,required:true},
    description:{type:String,required:true},
    status:{type:String,default:'pending',enum:['pending','accepted','rejected']},
    
},{timestamps:true})


const ReportModel = mongoose.model('ReportModel',reportModelSchema)
export default ReportModel