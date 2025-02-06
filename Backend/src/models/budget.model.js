import mongoose,{Schema} from 'mongoose'

const budgetSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    monthlyLimit:{
            type:mongoose.Schema.Types.Decimal128,
            required:true,
            default:0
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    currentSpending:{
        type:Number,
        required:true
    },
    alertThreshold:{

    },
       
},{timestamps: true})

export const Budget=mongoose.model(budgetSchema)