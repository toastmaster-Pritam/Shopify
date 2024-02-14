import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js'
import { createCategory,   deletecategory,   getallcategory, singleCategoryController, updateCategory } from '../controllers/CategoryController.js'

const router=express.Router()


router.post("/create-category",requireSignin,isAdmin,createCategory)

router.put("/update-category/:id",requireSignin,isAdmin,updateCategory)

router.get("/get-category",getallcategory)

router.get("/single-category/:slug",singleCategoryController)

router.delete("/delete-category/:id",requireSignin,isAdmin,deletecategory)
export default router