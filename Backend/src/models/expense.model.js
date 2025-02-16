// import mongoose, { Schema } from 'mongoose';
// import { Budget } from './budget.model.js';

// const expenseSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   paymentMethod: {
//     type: String,
//     required: true,
//   },
//   recurring: {
//     type: Boolean,
//     default: false,
//   },
// }, { timestamps: true });

// // Middleware to update Budget's `currentSpending` after an expense is added
// expenseSchema.post('save', async function (doc, next) {
//   try {
//     console.log(`🟢 Expense Added: ${doc.amount} to ${doc.category}`);

//     let budget = await Budget.findOne({ user: doc.user, category: doc.category });

//     if (!budget) {
//       console.log('🔴 Budget Not Found for Category:', doc.category);
//       // Create a new budget if none exists for the category
//       budget = new Budget({
//         user: doc.user,
//         category: doc.category,
//         monthlyLimit: 0, // Set a default monthly limit or adjust as needed
//         currentSpending: 0,
//       });
//     }

//     console.log(`🟡 Budget Found: Current Spending = ${budget.currentSpending}`);
//     budget.currentSpending += parseFloat(doc.amount);
//     console.log(`🟢 New Current Spending: ${budget.currentSpending}`);

//     await budget.save();
//     next();
//   } catch (error) {
//     console.error('❌ Error Updating Budget:', error);
//     next(error);
//   }
// });

// // Middleware to update Budget's `currentSpending` after an expense is deleted
// expenseSchema.post('findOneAndDelete', async function (doc) {
//   if (doc) {
//     try {
//       console.log(`🟠 Expense Deleted: ${doc.amount} from ${doc.category}`);

//       const budget = await Budget.findOne({ user: doc.user, category: doc.category });

//       if (budget) {
//         console.log(`🟡 Budget Found: Current Spending = ${budget.currentSpending}`);
//         budget.currentSpending -= parseFloat(doc.amount);
//         console.log(`🟢 New Current Spending: ${budget.currentSpending}`);

//         await budget.save();
//       } else {
//         console.log('🔴 Budget Not Found for Category:', doc.category);
//       }
//     } catch (error) {
//       console.error('❌ Error Updating Budget After Deletion:', error);
//     }
//   }
// });

// //Notification sent if the currentSpending exceeds the alertThreshold in budget model for each category 
// expenseSchema.post('save', async function (doc, next) {
//   try {
//       const budget = await Budget.findOne({ user: doc.user, category: doc.category });
//       if (budget) {
//           budget.currentSpending += parseFloat(doc.amount);
//           if (budget.currentSpending >= budget.alertThreshold) {
//               const notification = new Notification({
//                   user: doc.user,
//                   message: `You have exceeded 80% of your budget for ${doc.category}.`,
//                   status: 'unread',
//                   type: 'budget_alert',
//               });
//               await notification.save();
//           }
//           await budget.save();
//       }
//       next();
//   } catch (error) {
//       next(error);
//   }
// });


// export const Expense = mongoose.model('Expense', expenseSchema);

import mongoose, { Schema } from 'mongoose';
import { Budget } from './budget.model.js';
import { Notification } from './notification.model.js';

const expenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  recurring: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Middleware to handle updates to Budget and Notifications after an expense is added
expenseSchema.post('save', async function (doc, next) {
  try {
    console.log(`🟢 Expense Added: ${doc.amount} to ${doc.category}`);

    let budget = await Budget.findOne({ user: doc.user, category: doc.category });

    if (!budget) {
      console.log('🔴 Budget Not Found for Category:', doc.category);
      // Create a new budget if none exists for the category
      budget = new Budget({
        user: doc.user,
        category: doc.category,
        monthlyLimit: 0, // Set a default monthly limit or adjust as needed
        currentSpending: 0,
        alertThreshold: 0.8, // Default alert threshold at 80% of the monthly limit
      });
    }

    console.log(`🟡 Budget Found: Current Spending = ${budget.currentSpending}`);
    budget.currentSpending += parseFloat(doc.amount);
    console.log(`🟢 New Current Spending: ${budget.currentSpending}`);

    // Check if current spending exceeds the alert threshold
    if (budget.currentSpending >= budget.monthlyLimit * budget.alertThreshold) {
      const notification = new Notification({
        user: doc.user,
        message: `You have exceeded 80% of your budget for ${doc.category}.`,
        status: 'unread',
        type: 'budget_alert',
      });
      await notification.save();
      console.log('🔔 Notification Sent: Budget threshold exceeded.');
    }

    await budget.save();
    next();
  } catch (error) {
    console.error('❌ Error Updating Budget:', error);
    next(error);
  }
});

// Middleware to update Budget's `currentSpending` after an expense is deleted
expenseSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    try {
      console.log(`🟠 Expense Deleted: ${doc.amount} from ${doc.category}`);

      const budget = await Budget.findOne({ user: doc.user, category: doc.category });

      if (budget) {
        console.log(`🟡 Budget Found: Current Spending = ${budget.currentSpending}`);
        budget.currentSpending -= parseFloat(doc.amount);
        console.log(`🟢 New Current Spending: ${budget.currentSpending}`);

        await budget.save();
      } else {
        console.log('🔴 Budget Not Found for Category:', doc.category);
      }
    } catch (error) {
      console.error('❌ Error Updating Budget After Deletion:', error);
    }
  }
});

export const Expense = mongoose.model('Expense', expenseSchema);

