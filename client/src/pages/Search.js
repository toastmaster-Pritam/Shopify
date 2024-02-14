import React, { useContext } from 'react'
import Layout from '../components/Layout/Layout'
import { SearchContext } from '../context/Search'
import toast from 'react-hot-toast'
import { CartContext } from '../context/Cart'
import { useNavigate } from 'react-router-dom'


export default function Search() {

    const useCart = useContext(CartContext)
    const { cart, setCart } = useCart
    const useSearch = useContext(SearchContext)
    const { values, setValues } = useSearch
    const navigate = useNavigate()
    return (
        <>
            <Layout title={`Search Results for ${values?.keyword}`}>
                <div className="container">
                    <div className="text-center">
                        <h1>Search Results</h1>
                        <h6>
                            {values?.results.length < 1 ? "No Product Found" : `Found ${values?.results.length} items related to your search`}
                        </h6>
                        <div className="d-flex flex-wrap ">
                            {values?.results?.map((p) => {
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
                        {/* <div className="d-flex flex-wrap ">
                            {values?.results?.map((p) => (
                                <div className="card m-2" style={{ width: "14rem" }}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text"> ₹ {p.price}</p>
                                        <div className="text-center">
                                            <button class="btn btn-primary mt-1">More Details</button>
                                            <button class="btn btn-secondary mt-1">Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>

            </Layout>
        </>
    )
}
