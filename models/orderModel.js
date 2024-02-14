import mongoose from "mongoose"

const orderSchema= new mongoose.Schema({
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        },
    ],
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        default:"Not Processed",
        enum:["Not Processed","Processing","Shipped","Delivered","Cancel"],
    },
    
},{timestamps:true})

export default mongoose.model("order",orderSchema)