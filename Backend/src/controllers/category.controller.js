import mongoose, {isValidObjectId} from "mongoose"
import { Category } from "../models/category.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.body;
    const userId = req.user._id; // Get user from auth middleware

    if (!categoryName) {
        throw new ApiError(400, "Category name is required");
    }

    // Check if category already exists for the user
    const existingCategory = await Category.findOne({ user: userId, categoryName });
    if (existingCategory) {
        throw new ApiError(400, "Category already exists");
    }

    const category = await Category.create({ user: userId, categoryName });

    res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
});

const getCategories = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const categories = await Category.find({ user: userId });

    res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;

    const category = await Category.findById(id);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    category.categoryName = categoryName || category.categoryName;
    await category.save();

    res.status(200).json(new ApiResponse(200, category, "Category updated successfully"));
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    await category.deleteOne();

    res.status(200).json(new ApiResponse(200, {}, "Category deleted successfully"));
});


export {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}