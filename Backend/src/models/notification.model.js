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
        required:true,
        // enum: ["budget-alert", "expense-update", "reminder", "system", "payment", "goal-progress"],
    },
    
},{timestamps: true})

export const Notification=mongoose.model("Notification",notificationSchema)