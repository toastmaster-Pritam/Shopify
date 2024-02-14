import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CartContext } from '../context/Cart'

export default function CategoryPage() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const useCart = useContext(CartContext)
    const { cart, setCart } = useCart
    const params = useParams()
    const navigate = useNavigate()
    const getProductsbyCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        params?.slug && getProductsbyCat()
    }, [params?.slug])

    return (
        <>
            <Layout title={`${category?.name} - RajKart`}>
                <div className="container mt-3 ms-3">
                    <h4 className="text-center">
                        Category - {category?.name}
                    </h4>
                    <h6 className="text-center">
                        {products?.length} results found
                    </h6>
                    <div className="container">
                        <div className="d-flex flex-wrap text-center">
                            {products?.map((p) => {
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
                </div>

            </Layout >
        </>
    )
}
