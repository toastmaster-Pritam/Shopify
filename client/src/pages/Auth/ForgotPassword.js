import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [newPassword, setPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate=useNavigate()

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const res= await axios.post("/api/v1/auth/forgot-password",{
                email,
                answer,
                newPassword
            })
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                navigate("/login")
            }
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }

    return (
        <>
            <Layout title={"Forgot Password - RajKart"}>
                <div className="form-container" >
                    <form onSubmit={handleSubmit}>
                        <h4 className="title">RESET PASSWORD</h4>

                        <div className="mb-3">
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Your Favorite Color "
                                required
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
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Your New Password"
                                required
                            />
                        </div>

                        
                        <button type="submit" className="pnf-btn">
                            Change Password
                        </button>

                    </form>
                </div>
            </Layout>
        </>
    )
}
