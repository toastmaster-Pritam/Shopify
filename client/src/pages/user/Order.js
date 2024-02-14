import React, { useContext, useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { AuthContext } from '../../context/auth'
import moment from 'moment'


export default function Order() {
    const [orders, setOrders] = useState([])
    const useAuth = useContext(AuthContext)
    const { auth } = useAuth
    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders")
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])
    return (
        <>
            <Layout title={"Orders - Shopify"}>
                <div className="container-fluid p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />

                        </div>
                        <div className="col-md-9">
                            <h2 className='text-center'>Your Orders</h2>
                            {
                                orders?.map((o, i) => {
                                    return (
                                        <div className="border shadow">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope='col'>#</th>
                                                        <th scope='col'>Status</th>
                                                        <th scope='col'>Buyer</th>
                                                        <th scope='col'>Orders</th>
                                                        <th scope='col'>Payment</th>
                                                        <th scope='col'>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>{i + 1}</th>
                                                        <th>{o?.status}</th>
                                                        <th>{o?.buyer?.name}</th>
                                                        <th>{moment(o?.createAt).fromNow()}</th>
                                                        <th>{o?.payment.success ? "Success" : "Failed"}</th>
                                                        <th>{o?.products?.length}</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="container">
                                                <div className="col-md-12">
                                                    {o?.products?.map((p) => (
                                                        <>
                                                            <div className="row m-2 card flex-row  p-2">
                                                                <div className="col-md-4">
                                                                    <img
                                                                        src={`/api/v1/product/product-photo/${p._id}`}
                                                                        className="card-img-top m-auto mt-1"
                                                                        style={{
                                                                            height: "10rem",
                                                                            width: "10em",
                                                                            objectFit: "contain"
                                                                        }}
                                                                        alt={p.name}
                                                                    />
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <p>{p.name}</p>
                                                                    <p>{p.price.toLocaleString("en-IN", {
                                                                        style: "currency",
                                                                        currency: "INR"
                                                                    })}</p>
                                                                    
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}
