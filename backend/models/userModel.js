import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePicture:{type:String,default:''},
    bio:{type:String,default:''},
    gender:{type:String,enum:['male','female']},
    followersCount:{type:Number,default:0},
    followingCount:{type:Number,default:0},
    postsCount:{type:Number,default:0},
    isPrivate:{type:Boolean,default:false},
    isVerified:{type:Boolean,default:false}
},{timestamps:true});

export const User = mongoose.model('User',userSchema)