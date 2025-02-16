import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js'
import {
    createRecurringPayment,
    getRecurringPayments,
    getRecurringPaymentById,
    updateRecurringPayment,
    deleteRecurringPayment
} from '../controllers/recurringPayment.controller.js';

const router = Router();

// Apply JWT verification middleware to all routes
router.use(verifyJWT);

// Route to create a new recurring payment and get all recurring payments
router.route('/')
    .post(createRecurringPayment)  // Create a new recurring payment
    .get(getRecurringPayments);    // Get all recurring payments

// Routes to get, update, and delete a specific recurring payment by ID
router.route('/:recurringPaymentId')
    .get(getRecurringPaymentById)    // Get a specific recurring payment by ID
    .patch(updateRecurringPayment)   // Update a specific recurring payment by ID
    .delete(deleteRecurringPayment); // Delete a specific recurring payment by ID

export default router;
