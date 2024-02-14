import React, { useState, useEffect, useContext } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cart";
import toast from "react-hot-toast";


const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const useCart = useContext(CartContext)
    const { cart, setCart } = useCart

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    let flag = false
    for (let i = 0; i < cart.length; i++) {
        if (cart[i]._id === product._id) {
            flag = true;
            break;
        }
    }


    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">

                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{
                            objectFit: "contain",
                            height: "300px",
                            width: "300px"
                        }}
                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className="text-center">Product Details</h1>
                    <div className="container-fluid row">
                        <div className="col-md-3">
                            <h6>Name </h6>
                            <h6>Description</h6>
                            <h6>Price</h6>
                            <h6>Category</h6>
                        </div>
                        <div className="col-md-9">
                            <h6>{product.name}</h6>
                            <h6> {product.description}</h6>
                            <h6> ₹{product.price}/-</h6>
                            <h6> {product?.category?.name}</h6>
                        </div>
                    </div>
                    {flag ?
                        <button className=" btn-goto-cart mx-5 mt-5" onClick={() => {
                            navigate("/cart")
                        }}>Go To Cart</button>
                        :
                        <button className="btn-to-cart mx-5 mt-5" onClick={() => {
                            setCart([...cart, product])
                            localStorage.setItem("cart",
                                JSON.stringify([...cart, product]))
                            toast.success("Item added to cart")

                        }}>Add To Cart</button>
                    }

                </div>
            </div>
            <hr />
            <div className="row container ">
                <h6>Similar Products</h6>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex text-center flex-wrap">
                    {relatedProducts?.map((p) => {
                        let flag = false
                        for (let i = 0; i < cart.length; i++) {
                            if (cart[i]._id === p._id) {
                                flag = true;
                                break;
                            }
                        }
                        return (
                            <>
                                <div className="card m-2" style={{ width: "14rem" }} >
                                    <div style={{
                                        cursor: "pointer"
                                    }} onClick={() => navigate(`/product/${p.slug} `)}>

                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top cursor-pointer"
                                            style={{
                                                height: "14rem",
                                                width: "13.9rem",
                                                objectFit: "contain"
                                            }}
                                            alt={p.name} onClick={() => navigate(`/product/${p.slug} `)}
                                        />
                                        <div className="card-body" >
                                            <h5 className="card-title" style={{
                                                cursor: "pointer"
                                            }} onClick={() => navigate(`/product/${p.slug} `)}>{p.name}</h5>
                                            <p className="card-text" style={{
                                                cursor: "pointer"
                                            }} onClick={() => navigate(`/product/${p.slug} `)}> ₹ {p.price}</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        {flag ?
                                            <button className=" btn-goto-cart " onClick={() => {
                                                navigate("/cart")
                                            }}>Go To Cart</button>
                                            :
                                            <button className=" btn-to-cart " onClick={() => {
                                                setCart([...cart, p])
                                                localStorage.setItem("cart",
                                                    JSON.stringify([...cart, p]))
                                                toast.success("Item added to cart")

                                            }}>Add To Cart</button>
                                        }

                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;