import { Router } from "express";
import { verifyJWT } from "../../../../VideoTube/src/middlewares/auth.middleware.js";
import {
    createBudget,
    getAllBudgets,
    getBudgetByCategory,
    getBudgetById,
    getBudgetOverview,
    deleteBudget,
    updateBudget
} from "../controllers/budget.controller.js";

const router = Router();

// Apply JWT verification middleware to all routes
router.use(verifyJWT);

// Route to get an overview of budgets
router.route("/overview").get(getBudgetOverview);

// Route to get budgets by category
router.route("/category/:categoryId").get(getBudgetByCategory);

// Routes for creating and retrieving all budgets
router.route("/")
    .post(createBudget)  // Create a new budget
    .get(getAllBudgets); // Get all budgets

// Routes for specific budget operations (fetch, update, delete)
router.route("/:budgetId")
    .get(getBudgetById)    // Get a specific budget by ID
    .patch(updateBudget)   // Update a specific budget by ID
    .delete(deleteBudget); // Delete a specific budget by ID

export default router;
