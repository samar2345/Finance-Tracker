import mongoose,{Schema} from 'mongoose'

const notificationSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    
},{timestamps: true})

export const Notification=mongoose.model("Notification",notificationSchema)