import mongoose, {isValidObjectId} from "mongoose"
import { Budget } from "../models/budget.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createBudget = asyncHandler(async (req, res) => {
    const { monthlyLimit, category } = req.body;
    const userId = req.user._id;

    if (!monthlyLimit || !category) {
        throw new ApiError(400, "Monthly limit and category are required");
    }

    try {
        const budget = new Budget({
            user: userId,
            monthlyLimit,
            category,
            currentSpending: 0, // Initially, no spending
        });

        await budget.save();
        res.status(201).json(new ApiResponse(201, budget, "Budget created successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to create budget");
    }
});

const getAllBudgets = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const budgets = await Budget.find({ user: userId }).populate("category");
        res.status(200).json(new ApiResponse(200, budgets, "Budgets fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to fetch budgets");
    }
});

const getBudgetById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const budget = await Budget.findOne({ _id: id, user: userId }).populate("category");
        if (!budget) {
            throw new ApiError(404, "Budget not found");
        }
        res.status(200).json(new ApiResponse(200, budget, "Budget fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to fetch budget");
    }
});

const updateBudget = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { monthlyLimit } = req.body;

    try {
        const budget = await Budget.findOneAndUpdate(
            { _id: id, user: userId },
            { monthlyLimit, alertThreshold: monthlyLimit * 0.8 },
            { new: true, runValidators: true }
        );

        if (!budget) {
            throw new ApiError(404, "Budget not found");
        }

        res.status(200).json(new ApiResponse(200, budget, "Budget updated successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to update budget");
    }
});

const deleteBudget = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const budget = await Budget.findOneAndDelete({ _id: id, user: userId });
        if (!budget) {
            throw new ApiError(404, "Budget not found");
        }

        res.status(200).json(new ApiResponse(200, budget, "Budget deleted successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to delete budget");
    }
});


//doubt : use??
const getBudgetOverview = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const budgets = await Budget.find({ user: userId }).populate("category");

        const overview = budgets.map((budget) => ({
            category: budget.category,
            monthlyLimit: budget.monthlyLimit,
            currentSpending: budget.currentSpending,
            remainingBudget: budget.monthlyLimit - budget.currentSpending,
            alertThreshold: budget.alertThreshold,
            isOverThreshold: budget.currentSpending >= budget.alertThreshold,
        }));

        res.status(200).json(new ApiResponse(200, overview, "Budget overview fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to fetch budget overview");
    }
});

const getBudgetByCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const userId = req.user._id;

    try {
        const budget = await Budget.findOne({ user: userId, category: categoryId }).populate("category");

        if (!budget) {
            throw new ApiError(404, "Budget not found for the given category");
        }

        res.status(200).json(new ApiResponse(200, budget, "Budget fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to fetch budget");
    }
});

export {
    createBudget,
    getAllBudgets,
    getBudgetByCategory,
    getBudgetById,
    getBudgetOverview,
    deleteBudget,
    updateBudget
}



