import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js'
import { braintreePaymentController, braintreeTokenController, createproduct, deleteProductController, getSingleProduct, getproduct, productCategoryController, productCountController, productFilter, productListController, productPhotoController, realtedProductController, searchProduct, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'

const router=express.Router()



router.post("/create-product",requireSignin,isAdmin,formidable(),createproduct)

router.get("/get-product",getproduct)

router.get("/get-product/:slug",getSingleProduct)

router.get("/product-photo/:pid", productPhotoController);

router.put("/update-product/:pid",requireSignin,isAdmin,formidable(),updateProductController)

router.delete("/delete-product/:pid",requireSignin,isAdmin,deleteProductController)

router.post("/product-filters",productFilter)

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword",searchProduct)

router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/product-category/:slug",productCategoryController)

router.get("/braintree/token",braintreeTokenController)

router.post("/braintree/payment",requireSignin,braintreePaymentController)

export default router