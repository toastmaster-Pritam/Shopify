import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { CartContext } from '../context/Cart'
import { AuthContext } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { Modal } from 'antd'
import '../styles/cartStyle.css'
import Loader from '../components/Loader'

export default function CartPage() {

    const [clientToken, setClientToken] = useState("")
    const [loading, setLoading] = useState(false)
    const [instance, setInstance] = useState("")
    const [total, setTotal] = useState(0)
    const useCart = useContext(CartContext)
    const { cart, setCart } = useCart
    const useAuth = useContext(AuthContext)
    const { auth } = useAuth
    const navigate = useNavigate()


    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce, cart
            })
            setLoading(false)
            localStorage.removeItem("cart")
            setCart([])
            navigate("/dashboard/user/orders")
            toast.success("Payment Successfull")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const CheckOut = () => {
        console.log(1)
    }
    const totalPrice = () => {
        try {
            let tot = 0
            cart?.map((item) => {
                tot += item.price
            })
            setTotal(tot)
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        totalPrice()
    }, [cart?.length])

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
            toast.success("Item removed from cart")
        } catch (error) {
            console.log(error)
        }
    }

    const getToken = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/braintree/token")
            setClientToken(data?.clientToken)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getToken()
    }, [auth?.token])
    return (
        <>
            <Layout title={"Your Cart"}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="text-center p-2">
                                {`Hello ${auth?.token && auth?.user?.name}`}
                            </h1>
                            <h4 className="text-center mb-5">
                                {cart?.length > 0 ? `You have ${cart?.length} items in your cart ${auth?.token ? "" : "Please Login to Checkout"}` : `Your cart is Empty`}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            {cart?.map((p) => {
                                return (
                                    <>
                                        <div className="row m-2 card flex-row  p-2">
                                            <div className="col-md-4">
                                                <img
                                                    src={`/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top m-auto mt-1"
                                                    style={{
                                                        height: "10rem",
                                                        width: "10em",
                                                        objectFit: "contain",
                                                        cursor:"pointer"
                                                    }}
                                                    onClick={()=> navigate(`/product/${p.slug}`)}
                                                    alt={p.name}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <p>{p.name}</p>
                                                <p>₹{p.price}</p>
                                                <button className='btn btn-danger align-corner' onClick={() => removeCartItem(p._id)}>Remove</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <div className="col-md-4 text-center">
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total: ₹{total}</h4>
                            {auth?.user?.address ? (
                                <>
                                    <h4>Current Address:</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className="pnf-btn mx-3 mt-3" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                    {/* <button className="btn btn-warning mx-3 mt-3" onClick={() => CheckOut()}>CheckOut</button> */}
                                </>
                            ) : <button className="pnf-btn" onClick={() => navigate("/login", { state: '/cart' })}>Please Login to Checkout</button>}
                            <button className='ordr-pay-btn' onClick={showModal} disabled={!auth?.user || auth?.user?.role || !cart?.length}>{auth?.user?.role ? "You are admin " :`Pay to Order ` }<i class="fa-solid fa-arrow-right-long"></i></button>
                            <Modal title="Payment Gateway" maskClosable={false} closable={false} footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                                <div className="mt-2">
                                    {!clientToken || !cart?.length ? ("") : (
                                        <>
                                            <DropIn
                                                options={{
                                                    authorization: clientToken,
                                                    paypal: {
                                                        flow: "vault"
                                                    }
                                                }}
                                                onInstance={(instance) => setInstance(instance)}
                                            />
                                            <div className="text-center">

                                                <button className="payment-btn" disabled={loading}
                                                    onClick={handlePayment}>
                                                    {loading ? <Loader /> : "Make Payment"}</button>
                                                <button className="payment-cancel" onClick={handleCancel} disabled={loading}>
                                                    Cancel Payment
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
