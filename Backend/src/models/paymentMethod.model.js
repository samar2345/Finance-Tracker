import mongoose,{Schema} from 'mongoose'

const paymentMethodSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    methodName: {
        type: String,
        required: true,
        unique: true, // Prevents duplicates
    },
       
},{timestamps: true})

export const PaymentMethod=mongoose.model("PaymentMethod",paymentMethodSchema)