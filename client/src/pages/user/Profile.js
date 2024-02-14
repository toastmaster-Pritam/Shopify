import React, { useContext, useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { AuthContext } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'


export default function Profile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const useAuth = useContext(AuthContext)
    const { auth, setAuth } = useAuth
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put("/api/v1/auth/update-user", {
                name,
                phone,
                address,
            });
            if(data?.succuss){
                toast.error("Something went wrong in updating")
            }
            else{
                
                setAuth({
                    ...auth,
                    user:data?.updatedUser
                })
                toast.success(data?.message)
                console.log(data)

                let ls=JSON.parse(localStorage.getItem("auth"))
                ls.user=data?.updateduser;
                localStorage.setItem("auth",JSON.stringify(ls))  
               
                window.location.reload()  
                      
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(()=>{
        setName(auth?.user?.name)
        setEmail(auth?.user?.email)
        setPhone(auth?.user?.phone)
        setAddress(auth?.user?.address)
    },[auth?.user])


    return (
        <>
            <Layout title={"Profile - Shopify"}>
                <div className="container-fluid p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />

                        </div>
                        <div className="col-md-9">
                            <div className="form-container " >
                                <form onSubmit={handleSubmit}>
                                    <h4 className="title">USER PROFILE</h4>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Name"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Email "
                                            disabled
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Phone"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Address"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="pnf-btn">
                                        UPDATE
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}
