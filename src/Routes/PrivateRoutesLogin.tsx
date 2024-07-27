import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getCookie } from '../components/Cookies';

const PrivateRoutesLogin = () => {
  let auth = getCookie('Customer_access_token');
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-2);
  }, []);

  return auth ? navigate(-1) : <Navigate to="/Login" />;
};

export default PrivateRoutesLogin;
