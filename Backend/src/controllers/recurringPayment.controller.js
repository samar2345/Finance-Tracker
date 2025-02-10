import { RecurringPayment } from '../models/recurringPayment.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const createRecurringPayment = asyncHandler(async (req, res) => {
    const { amount, frequency, startDate, endDate, paymentMethod } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!amount || !frequency || !startDate || !paymentMethod) {
        throw new ApiError(400, 'All required fields must be provided');
    }

    // Create the recurring payment
    const recurringPayment = await RecurringPayment.create({
        user: userId,
        amount,
        frequency,
        startDate,
        endDate,
        paymentMethod,
    });

    res.status(201).json(new ApiResponse(201, recurringPayment, 'Recurring payment created successfully'));
});

const getRecurringPayments = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Retrieve all recurring payments for the authenticated user
    const recurringPayments = await RecurringPayment.find({ user: userId }).populate('paymentMethod');

    res.status(200).json(new ApiResponse(200, recurringPayments, 'Recurring payments fetched successfully'));
});

const getRecurringPaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Find the recurring payment by ID and ensure it belongs to the user
    const recurringPayment = await RecurringPayment.findOne({ _id: id, user: userId }).populate('paymentMethod');

    if (!recurringPayment) {
        throw new ApiError(404, 'Recurring payment not found');
    }

    res.status(200).json(new ApiResponse(200, recurringPayment, 'Recurring payment fetched successfully'));
});

const updateRecurringPayment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { amount, frequency, startDate, endDate, paymentMethod } = req.body;

    // Find the recurring payment by ID and ensure it belongs to the user
    const recurringPayment = await RecurringPayment.findOne({ _id: id, user: userId });

    if (!recurringPayment) {
        throw new ApiError(404, 'Recurring payment not found');
    }

    // Update fields if provided
    if (amount !== undefined) recurringPayment.amount = amount;
    if (frequency) recurringPayment.frequency = frequency;
    if (startDate) recurringPayment.startDate = startDate;
    if (endDate) recurringPayment.endDate = endDate;
    if (paymentMethod) recurringPayment.paymentMethod = paymentMethod;

    await recurringPayment.save();

    res.status(200).json(new ApiResponse(200, recurringPayment, 'Recurring payment updated successfully'));
});

const deleteRecurringPayment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Find and delete the recurring payment
    const recurringPayment = await RecurringPayment.findOneAndDelete({ _id: id, user: userId });

    if (!recurringPayment) {
        throw new ApiError(404, 'Recurring payment not found');
    }

    res.status(200).json(new ApiResponse(200, null, 'Recurring payment deleted successfully'));
});

export {
    createRecurringPayment,
    getRecurringPayments,
    getRecurringPaymentById,
    updateRecurringPayment,
    deleteRecurringPayment,
};
