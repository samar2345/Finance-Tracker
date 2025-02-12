import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { createExpense, deleteExpense, getAllExpenses, getExpenseById, getExpensesByCategory, getExpensesByDateRange, getTotalExpenses, updateExpense, } from '../controllers/expense.controller.js'

const router=Router()


router.use(verifyJWT)
router.route("/").post(createExpense).get(getAllExpenses)
router.route("/:expenseId").delete(deleteExpense).patch(updateExpense).get(getExpenseById)
router.route(":/category/categoryId").get(getExpensesByCategory)
router.route("/date-range").get(getExpensesByDateRange)
router.route("/total").get(getTotalExpenses)
export default router