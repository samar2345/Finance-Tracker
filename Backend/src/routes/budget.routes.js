import {Router} from 'express'
import { verifyJWT } from '../../../../VideoTube/src/middlewares/auth.middleware'
import { createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory } from '../controllers/expense.controller'

const router=Router()


router.use(verifyJWT)
router.route('/').post(createCategory).get(getCategories)
router.route('/c/:categoryId').get(getCategoryById).patch(updateCategory).delete(deleteCategory)
