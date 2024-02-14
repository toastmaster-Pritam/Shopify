import fs from 'fs'
import productmodel from '../models/productmodel.js'
import slugify from 'slugify'
import categorymodel from '../models/categorymodel.js'
import braintree from 'braintree'
import orderModel from '../models/orderModel.js'
import dotenv from 'dotenv'

dotenv.config()


export const createproduct = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        if (!name) {
            return res.status(500).json({
                success: false,
                message: "Name is required"
            })
        }
        if (!description) {
            return res.status(500).json({
                success: false,
                message: "Description is required"
            })
        }
        if (!price) {
            return res.status(500).json({
                success: false,
                message: "Price is required"
            })
        }
        if (!category) {
            return res.status(500).json({
                success: false,
                message: "Category is required"
            })
        }
        if (!quantity) {
            return res.status(500).json({
                success: false,
                message: "Quantity is required"
            })
        }
        if (photo && photo.size > 1000000) {
            return res.status(500).json({
                success: false,
                message: "Photo is required and should be less than 1MB"
            })
        }
        const products = new productmodel({
            ...req.fields,
            slug: slugify(name)
        })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            products,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in creating Product",
            error,
        })
    }
}

export const getproduct = async (req, res) => {
    try {
        const products = await productmodel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            countTotal: products.length,
            message: "All Products",
            products,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in finding products",
            error,
        })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { slug } = req.params
        const product = await productmodel.findOne({ slug }).select("-photo").populate("category")
        res.status(200).json({
            success: true,
            message: "Single Product Fetched",
            product,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in finding single Product",
            error
        })
    }
}


export const productPhotoController = async (req, res) => {
    try {
        const product = await productmodel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await productmodel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};


export const updateProductController = async (req, res) => {
    try {

        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        if (!name) {
            return res.status(500).json({
                success: false,
                message: "Name is required"
            })
        }
        if (!description) {
            return res.status(500).json({
                success: false,
                message: "Description is required"
            })
        }
        if (!price) {
            return res.status(500).json({
                success: false,
                message: "Price is required"
            })
        }
        if (!category) {
            return res.status(500).json({
                success: false,
                message: "Category is required"
            })
        }
        if (!quantity) {
            return res.status(500).json({
                success: false,
                message: "Quantity is required"
            })
        }
        if (photo && photo.size > 1000000) {
            return res.status(500).json({
                success: false,
                message: "Photo is required and should be less than 1MB"
            })
        }
        const products = await productmodel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            products,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Updating product",
            error,
        });
    }
};


export const productFilter = async (req, res) => {
    try {

        const { radio, checked } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productmodel.find(args)
        res.status(200).json({
            success: true,
            message: "Filter Successfull",
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in filtering Product",
            error,
        })
    }
}


export const productCountController = async (req, res) => {
    try {
        const total = await productmodel.find({}).estimatedDocumentCount();
        res.status(200).json({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in product count",
            error,
        });
    }
};

export const productListController = async (req, res) => {
    try {
        const perPage = 12;
        const page = req.params.page ? req.params.page : 1;
        const products = await productmodel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error in getting per page data",
            error,
        });
    }
};



export const searchProduct = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await productmodel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select("-photo");
        res.json({ result })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in searching",
            error,
        })
    }
}

export const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productmodel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error while geting related product",
            error,
        });
    }
};


export const productCategoryController = async (req, res) => {
    try {
        const { slug } = req.params
        const category = await categorymodel.findOne({ slug })
        const products = await productmodel.find({ category }).populate('category')
        res.status(200).json({
            success: true,
            category,
            products,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured in getting single category",
            error
        })
    }
}

/////////////
// PaymentGateway
//////////////

let gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.send(response)
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in getting payment token",
            error
        })
    }
}

export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0;
        cart.map((i) => {
            total += i.price
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true,
            },
        },
        function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save()
                    res.json({
                        ok:true,
                    })
                }
                else{
                    res.status(500).send(error)
                }
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in Payment",
            error
        })
    }
}