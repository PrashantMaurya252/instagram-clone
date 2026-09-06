


const notificationSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    type:{type:String,enum:['like','comment','follow','reply'],required:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:'post'},
    from:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    read:{type:Boolean,default:false}
},{timestamps:true})


const Notification = mongoose.model('Notification',notificationSchema)

export default Notification