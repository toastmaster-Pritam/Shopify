import jwt from "jsonwebtoken"
import usermodel from "../models/usermodel.js"


export const requireSignin=(req,res,next)=>{
    try {
        const decode=jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=decode
        next()
        
    } catch (error) {
        console.log(error)
    }
}

export const isAdmin=async (req,res,next)=>{
    try {
        const user = await usermodel.findById(req.user._id)
        if(user.role !==1){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access"
            })
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error)
    }
}