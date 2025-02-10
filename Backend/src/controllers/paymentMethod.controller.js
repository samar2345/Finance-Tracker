import { PaymentMethod } from "../models/paymentMethod.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPaymentMethod = asyncHandler(async (req, res) => {
    const { methodName } = req.body;
    const userId = req.user._id;

    if (!methodName) {
        throw new ApiError(400, "Payment method name is required");
    }

    const existingMethod = await PaymentMethod.findOne({ user: userId, methodName });
    if (existingMethod) {
        throw new ApiError(400, "Payment method already exists");
    }

    const paymentMethod = await PaymentMethod.create({ user: userId, methodName });

    res.status(201).json(new ApiResponse(201, paymentMethod, "Payment method created successfully"));
});

const getPaymentMethods = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const paymentMethods = await PaymentMethod.find({ user: userId });

    res.status(200).json(new ApiResponse(200, paymentMethods, "Payment methods fetched successfully"));
});
const getPaymentMethodById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const paymentMethod = await PaymentMethod.findOne({ _id: id, user: userId });

    if (!paymentMethod) {
        throw new ApiError(404, "Payment method not found");
    }

    res.status(200).json(new ApiResponse(200, paymentMethod, "Payment method fetched successfully"));
});

const updatePaymentMethod = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { methodName } = req.body;

    if (!methodName) {
        throw new ApiError(400, "Payment method name is required");
    }

    const paymentMethod = await PaymentMethod.findOneAndUpdate(
        { _id: id, user: userId },
        { methodName },
        { new: true, runValidators: true }
    );

    if (!paymentMethod) {
        throw new ApiError(404, "Payment method not found");
    }

    res.status(200).json(new ApiResponse(200, paymentMethod, "Payment method updated successfully"));
});

const deletePaymentMethod = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const paymentMethod = await PaymentMethod.findOneAndDelete({ _id: id, user: userId });

    if (!paymentMethod) {
        throw new ApiError(404, "Payment method not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Payment method deleted successfully"));
});
export {
    createPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    updatePaymentMethod,
    deletePaymentMethod
};
