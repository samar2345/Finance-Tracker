import { Router } from "express";
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { 
    createPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    updatePaymentMethod,
    deletePaymentMethod
} from "../controllers/paymentMethod.controller.js";

const router = Router();

// Middleware to verify JWT
router.use(verifyJWT);

// Routes for payment methods
router.route('/')
    .post(createPaymentMethod)  // Create a new payment method
    .get(getPaymentMethods);   // Get all payment methods

router.route('/:id')
    .get(getPaymentMethodById) // Get a specific payment method by ID
    .patch(updatePaymentMethod) // Update a payment method
    .delete(deletePaymentMethod); // Delete a payment method

export default router;
