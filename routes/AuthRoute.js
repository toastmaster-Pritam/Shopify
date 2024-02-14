import express from "express"
import { forgotpassword, logincontroller, orderStatusController, registerController, updateuser, userAllOrderController, userOrderController } from "../controllers/authController.js"
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/register", registerController)
router.post("/login", logincontroller)

router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true })
})
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

router.put("/update-user", requireSignin, updateuser)

router.post("/forgot-password", forgotpassword)

router.get("/orders", requireSignin, userOrderController)

router.get("/all-orders", requireSignin, isAdmin, userAllOrderController)

router.put(
    "/order-status/:orderId",
    requireSignin,
    isAdmin,
    orderStatusController
);

export default router