import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'

export default function Private() {
    const useAuth=useContext(AuthContext)
    const {auth}=useAuth

    const [ok,setok]=useState(false)

    useEffect(()=>{
        const authcheck=async()=>{
            const res=await axios.get('/api/v1/auth/user-auth')
            if(res.data.ok){
                setok(true)
            }
            else{
                setok(false)
            }
        }
        if(auth?.token){
            authcheck()
        }
    },[auth?.token])
  return ok?<Outlet/> : <Spinner/>
}
