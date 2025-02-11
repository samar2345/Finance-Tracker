import mongoose, {isValidObjectId} from "mongoose"
// import {Budget} from "../models/budget.model.js"
import {User} from "../models/user.model.js"
import { Expense } from "../models/expense.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"

const createExpense = asyncHandler(async (req, res) => {
    const { amount, category, description, paymentMethod, recurring } = req.body;

    // Validate request body
    if (!(amount && category && description && paymentMethod && recurring)) {
        throw new ApiError(400, "Amount, category, description, paymentMethod, and recurring fields are required");
    }

    console.log("req.body : ", req.body);

    const userId = req.user._id;
    if(!userId){
        throw new ApiError(401,"Unauthorized. user must be logged in to create a tweet")
    }

    try {
        // Create a new expense
        const expense = new Expense({
            user: userId,
            amount: Decimal128.fromString(req.body.amount.toString()),
            category,
            description,
            paymentMethod,
            recurring,
        });

        // Save to database
        await expense.save();

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            expense,
        });
    } catch (error) {
        throw new ApiError(500, "Failed to create expense");
    }
});

const getAllExpenses = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming authentication middleware provides `req.user`
    if(!userId){
        throw new ApiError(401,"Unauthorized. user must be logged in to create a tweet")
    }
    try {
        const expenses = await Expense.find({ user: userId })
            .populate("category")
            .populate("paymentMethod")
            .populate("recurring");

        res.status(200).json({
            success: true,
            // count: expenses.length,
            expenses,
        });
    } catch (error) {
        // res.status(500).json({ success: false, message: "Failed to fetch expenses" });
        throw new ApiError(500, "Failed to fetch expenses")
    }
});

const getExpenseById= asyncHandler(async(req,res)=>{
    const id=req.params;
    const userId=req.user._id;
    if(!userId){
        throw new ApiError(401,"Unauthorized. user must be logged in to create a tweet")
    }

    try {
    const expense = await Expense.findOne({ _id: id, user: userId })
            .populate("category")
            .populate("paymentMethod")
            .populate("recurring");

        if (!expense) {
            throw new ApiError(500, "No expense found")
        }

        res.status(200).json({ success: true, expense });
    } catch (error) {
        throw new ApiError(500, "Failed to fetch expense")
    }


})

const updateExpense =asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const {id}=req.params

    if (!id) {
        throw new ApiError(404, "Expense not found or you are not authorized to delete it.");
    }

    const expense= await Expense.findOneAndUpdate({
        _id:id,
        user:userId
    },
    req.body,
    {
        new : true,
        runValidators:true
    }

    

    )
    res.status(500).json(new ApiResponse(500,expense,"Expense updated successfully"));
    
})

const deleteExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const expense = await Expense.findOne({ _id: id, user: userId });

        if (!expense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }

        await expense.deleteOne();

        res.status(200).json(200,expense, "Expense deleted successfully");
    } catch (error) {
        res.status(500).json(200,expense, "Failed to delete successfully");
    }
});

const getExpensesByCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ user: userId, category: categoryId });

        res.status(200).json(200,expenses,
            // expenses.length
            "Expense fetched successfully");
    } catch (error) {
        res.status(500).json(500,expense, "Failed to fetch expenses by category");
    }
});

const getExpensesByDateRange = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({
            user: userId,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });

        res.status(200).json({ success: true, 
            // count: expenses.length,
             expenses });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch expenses" });
    }
});

const getTotalExpenses=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    
    try {
        const total=await Expense.aggregate([
            {
                $match:{user:userId}
            },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ])
        
        res.status(200).json({ success: true, totalAmount: total[0]?.totalAmount || 0 });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to calculate total expenses" });
    }
    
})





    
export { 
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getExpensesByDateRange,
    getTotalExpenses,
    

 }


