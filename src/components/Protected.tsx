import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './Cookies';

function Protected(props: any) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = getCookie('Customer_access_token');
    if (login) {
      navigate(-1);
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
