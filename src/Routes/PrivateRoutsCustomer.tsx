import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../components/Cookies'

const PrivateRoutsCustomer = () => {
  let auth = getCookie('Customer_access_token')
  return (
    auth ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutsCustomer