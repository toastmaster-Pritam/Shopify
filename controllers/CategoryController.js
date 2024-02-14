import slugify from "slugify"
import categorymodel from "../models/categorymodel.js"


export const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).json({
                message: "Name is required"
            })
        }
        const existingCategory = await categorymodel.findOne({ name })
        if (existingCategory) {
            return res.status(200).json({
                success: true,
                message: "Category already exists"
            })

        }
        const category=await new categorymodel({name,slug:slugify(name)}).save()
        res.status(201).json({
            success:true,
            message:"New Category Added",
            category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
            message: "Error in category"
        })
    }
}

export const updateCategory= async (req,res)=>{
    try {

        const {name}=req.body
        const {id}=req.params
        const category=await categorymodel.findByIdAndUpdate(
            id,
            {name,slug:slugify(name)},
            {new:true}
        )
        res.status(200).json({
            success:true,
            message:"Category Updated Successfully",
            category,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in updating",
            error
        })
    }
}


export const getallcategory=async(req,res)=>{
    try {
        const category=await categorymodel.find({})
        res.status(200).send({
            success:true,
            message:"All Categories List",
            category
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error while getting categories",
            error
        })
    }
}

export const singleCategoryController=async(req,res)=>{
    try {
        const {slug}=req.params
        const category=await categorymodel.findOne({slug})
        if(!category){
            return res.status(404).json({
                success:false,
                message:"No such Category"
            })
        }
        res.status(200).json({
            success:true,
            message:"Got Single Category Successfully",
            category
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error while getting single category",
            error
        })
    }
}


export const deletecategory=async (req,res)=>{
    try {

        const {id}=req.params
        await categorymodel.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Successfully Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in deleting category",
            error
        })        
    }
}