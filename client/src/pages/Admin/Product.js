import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Product() {

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product")
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
            toast.error("Error in getting Products")
        }
    }
    //lifecycle method
    useEffect(() => {

        getAllProducts()
    }, [])

    return (
        <Layout>
            <div className="container-fluid  p-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 >
                            All Products List
                        </h1>

                        <div className="container">
                            <div className="d-flex flex-wrap ">
                                {products?.map((p) => (
                                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                        <div className="card m-2" style={{ width: "14rem" }}>
                                            <img
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                className="card-img-top cursor-pointer"
                                                style={{
                                                    height: "14rem",
                                                    width: "13.9rem",
                                                    objectFit: "contain"
                                                }}
                                                alt={p.name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text"> ₹ {p.price}</p>

                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
