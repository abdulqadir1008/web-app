import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../components/Cookies'

const PrivateRoutsOwner = () => {
  let auth = getCookie('Owner_access_token')
  return (
    auth ? <Outlet /> : <Navigate to='/ownerLogin' />
  )
}

export default PrivateRoutsOwner