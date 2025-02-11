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
          type: Number,
        default: function () {
          return parseFloat(this.monthlyLimit) * 0.8; // 80% of monthly limit
      },
      }
  },{timestamps: true})


  //Not understood 
  // expenseSchema.post("save", async function (doc, next) {
  //     try {
  //       await Budget.findOneAndUpdate(
  //         { userId: doc.userId, category: doc.category },
  //         { $inc: { currentSpending: doc.amount } } // Increase currentSpending
  //       );
  //       next();
  //     } catch (error) {
  //       next(error);
  //     }
  //   });   
    
    // 🔹 Middleware to update Budget when an expense is deleted
    // expenseSchema.post("findOneAndDelete", async function (doc) {
    //   if (doc) {
    //     await Budget.findOneAndUpdate(
    //       { userId: doc.userId, category: doc.category },
    //       { $inc: { currentSpending: -doc.amount } } // Decrease currentSpending
    //     );
    //   }
    // });

    // 🔹 Middleware: Update Budget's `currentSpending` after an expense is added

    // expenseSchema.post("save", async function (doc, next) {
    //   try {
    //     const budget = await Budget.findOne({ user: doc.user, category: doc.category });
    
    //     if (budget) {
    //       budget.currentSpending += doc.amount;
    //       budget.alertThreshold = parseFloat(budget.monthlyLimit) * 0.8; // Recalculate alert threshold
    
    //       // 🚨 Trigger Alert if Spending Exceeds Threshold
    //       if (budget.currentSpending >= budget.alertThreshold) {
    //         console.log(`⚠️ Alert: You have exceeded 80% of your budget for ${doc.category}`);
    //         // TODO: Send email/SMS notification to the user
    //       }
    
    //       await budget.save();
    //     }
    
    //     next();
    //   } catch (error) {
    //     next(error);
    //   }
    // });


    // Middleware to update alertThreshold before saving
  budgetSchema.pre("save", function (next) {
      if (this.monthlyLimit) {
        this.alertThreshold = parseFloat(this.monthlyLimit) * 0.8; // 80% of budget
      }
      next();
    });

  export const Budget=mongoose.model("Budget",budgetSchema)