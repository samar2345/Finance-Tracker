import cron from 'node-cron';
import { RecurringPayment } from '../models/recurringPayment.model.js';
import { Notification } from '../models/notification.model.js';
// Import any other required services or utilities
// Task to send reminders for upcoming recurring payments
cron.schedule('0 8 * * *', async () => {
    // Task implementation
    try {
        const upcomingPayments = await RecurringPayment.find({
            nextPaymentDate: {
                $gte: new Date(),
                $lt: new Date(new Date().setDate(new Date().getDate() + 3)) // Payments due in the next 3 days
            }
        }).populate('user');

        for (const payment of upcomingPayments) {
            const message = `Reminder: Your recurring payment for ${payment.category} of amount ${payment.amount} is due on ${payment.nextPaymentDate.toDateString()}.`;

            await Notification.create({
                user: payment.user._id,
                message: message,
                status: 'unread',
                type: 'recurring'
            });

            console.log(`🟢 Notification sent for upcoming payment: ${message}`);
        }
    } catch (error) {
        console.error("❌ Error Sending Recurring Payment Notifications:", error);
    }
});

// Task to process due recurring payments
cron.schedule('0 9 * * *', async () => {
    // Task implementation
    try {
        const duePayments = await RecurringPayment.find({
            nextPaymentDate: { $lte: new Date() }
        }).populate('user');

        for (const payment of duePayments) {
            // Process the payment (implementation depends on your payment gateway)
            const success = await processPayment(payment);

            if (!success) {
                const message = `⚠️ Alert: Your recurring payment for ${payment.category} of amount ${payment.amount} failed. Please check your payment method.`;

                await Notification.create({
                    user: payment.user._id,
                    message: message,
                    status: 'unread',
                    type: 'recurring'
                });

                console.log(`🔴 Payment failed and notification sent: ${message}`);
            } else {
                // Update the next payment date upon successful payment
                payment.nextPaymentDate = calculateNextPaymentDate(payment.frequency);
                await payment.save();
            }
        }
    } catch (error) {
        console.error("❌ Error Processing Recurring Payments:", error);
    }
});
