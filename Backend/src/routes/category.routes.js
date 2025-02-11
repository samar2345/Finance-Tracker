import {Router} from 'express'
import { verifyJWT } from '../../../../VideoTube/src/middlewares/auth.middleware.js'
import { createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory } from '../controllers/category.controller.js'

const router=Router()


router.use(verifyJWT)
router.route('/').post(createCategory).get(getCategories)
router.route('/c/:categoryId').get(getCategoryById).patch(updateCategory).delete(deleteCategory)
export default router