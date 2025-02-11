import mongoose,{mongo, Schema} from 'mongoose'
import { Budget } from './budget.model.js';

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


expenseSchema.post("save", async function (doc, next) {
    try {
      await Budget.findOneAndUpdate(
        { userId: doc.userId, category: doc.category },
        { $inc: { currentSpending: doc.amount } } // Increase currentSpending
      );
      next();
    } catch (error) {
      next(error);
    }
  });  

// Middleware to update Budget's `currentSpending` after an expense is added
expenseSchema.post("save", async function (doc, next) {
    try {
        const budget = await Budget.findOne({ user: doc.user, category: doc.category });

        if (budget) {
            budget.currentSpending += parseFloat(doc.amount);
            budget.alertThreshold = parseFloat(budget.monthlyLimit) * 0.8; // Recalculate alert threshold

            // 🚨 Trigger Alert if Spending Exceeds Threshold
            if (budget.currentSpending >= budget.alertThreshold) {
                console.log(`⚠️ Alert: You have exceeded 80% of your budget for ${doc.category}`);
                // TODO: Send email/SMS notification to the user
            }

            await budget.save();
        }

        next();
    } catch (error) {
        next(error);
    }
});


export const Expense=mongoose.model("Expense",expenseSchema)