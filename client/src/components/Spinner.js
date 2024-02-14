import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import Loader from './Loader'

export default function Spinner() {

    const [count, setCount] = useState("3")
    const navigate = useNavigate()
    const location=useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevval)=> --prevval  )
        },1000)
        count===0 && navigate("/",{
            state:location.pathname
        })


        return ()=> clearInterval(interval)


    },[count,navigate,location])

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
                <h1 className='text-center'>Redirecting you in {count} seconds</h1>
                <Loader/>
            </div>
        </>
    )
}
