import mongoose,{Schema} from 'mongoose'

const recurringPaymentSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    description:{
        type:String,
        required:true
    },
    frequency:{
        type:String,
        required:true
    },
    nextPaymentDate:{
//remaining
    },
    paymentMethod:{
        type:Schema.Types.ObjectId,
        ref:"PaymentMethod"
    },
    
},{timestamps: true})

export const RecurringPayment=mongoose.model(recurringPaymentSchema)