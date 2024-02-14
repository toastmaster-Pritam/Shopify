import e from "express"
import { comparePassword, hashPassWord } from "../helpers/authHelper.js"
import orderModel from "../models/orderModel.js"
import usermodel from "../models/usermodel.js"
import jwt from 'jsonwebtoken'


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        if (!name) {
            return res.json({
                message: "Name is required"
            })
        }
        if (!email) {
            return res.json({
                message: "Email is required"
            })
        }
        if (!password) {
            return res.json({
                message: "Password is required"
            })
        }
        if (!phone) {
            return res.json({
                message: "Phone No. is required"
            })
        }
        if (!address) {
            return res.json({
                message: "Address is required"
            })
        }
        if (!answer) {
            return res.json({
                message: "Answer is required"
            })
        }

        //existing user
        let user = await usermodel.findOne({ email })
        if (user) {
            return res.status(200).json({
                success: true,
                message: "User already registered, please login"
            })
        }
        //register
        const hashedPassword = await hashPassWord(password)

        user = await usermodel.create({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "15d" })

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
            token
        })


    } catch (error) {
        res.json({
            success: false,
            message: "Error in registration",
            error
        })
    }
}


export const logincontroller = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const user = await usermodel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found Please register"
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Wrong Password"
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "15d" })

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in Login",
            error
        })
    }

}


export const forgotpassword = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }
        if (!answer) {
            res.status(400).send({
                success: false,
                message: "Answer is required"
            })
        }
        if (!newPassword) {
            res.status(400).send({
                success: false,
                message: "New Password is required"
            })
        }

        const user = await usermodel.findOne({ email, answer })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Wrong email or answer"
            })
        }
        const hashed = hashPassWord(newPassword)
        await usermodel.findByIdAndUpdate(user._id, { newPassword: hashed })
        res.status(200).json({
            success: true,
            message: "Password Reset Successfull"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const updateuser = async (req, res) => {
    try {
        const { name, phone, address } = req.body
        const user = await usermodel.findById(req.user._id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const updateduser = await usermodel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            phone: phone || user.phone,
            address: address || user.address,

        }, { new: true })
        res.status(201).json({
            success: true,
            message: "Profile Updated Successfully",
            updateduser,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in updating Product",
            error,
        })
    }
}

export const userOrderController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name")
        res.json(orders)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in getting user Order"
        })
    }
}

export const userAllOrderController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer", "name").sort({ $natural:-1 })
        res.json(orders)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in getting All Products",
            error
        })
    }
}

export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updating Order",
            error,
        });
    }
};