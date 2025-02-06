import mongoose,{mongo, Schema} from 'mongoose'

const expenseSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:mongoose.Schema.Types.Decimal128,
        required:true,
        default:0
    },
    // category:{
    //     type:String,
    //     required:true
    // },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    date:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        required:true,
    },
    // paymentMethod:{ // can be made as option
    //     type:String,
    //     required:true
    // },
    // recurring:{
    //     type:Boolean,
        
    // },
    paymentMethod:{
        type:Schema.Types.ObjectId,
        ref:"PaymentMethod"
    },
    recurring:{
        type:Schema.Types.ObjectId,
        ref:"RecurringPayment"
    }

},{timestamps: true})

export const Expense=mongoose.model(expenseSchema)