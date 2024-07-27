import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getCookie, setCookie } from '../components/Cookies';
import { EmployeeLoginQuery } from '../graphqlQueries/EmployeeQuery';
import WelcomeBackLogo from '../assets/WelcomeBackLogo.png';
import { resolvePostApi } from '../Common/ResolveApi';

const EmployeeLogin = () => {
  let Token = getCookie('Employee_access_token');

  const navigate = useNavigate();
  useEffect(() => {
    if (Token) {
      window.location.reload();
      navigate(-1);
    }
  }, []);

  const [auth, setauth] = useState<boolean>(false);
  const [login_id, setlogin_id] = useState<string>('');
  const [password, setpassword] = useState<string>('');

  const getData = async (login_id: any, password: any) => {
    try {
      const { employeeLogin } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, EmployeeLoginQuery(login_id, password));
      setCookie('Employee_access_token', employeeLogin.access_token);
      let login = getCookie('Employee_access_token');
      if (login) {
        navigate('/carRegistration');
      }
    } catch (error) {
      setauth(true);
    }
  };

  const [passwordType, setPasswordType] = useState('password');
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  return (
    <div className="d-flex  vh-100 align-items-center justify-content-center ">
      <div className="shadow border rounded-4 sign-up-form-box width-size">
        <div className="d-flex justify-content-center">
          <img src={WelcomeBackLogo} width="70rem" alt="..." />
        </div>
        <div className="d-flex justify-content-center welcome-text">Welcome back to INFILA</div>

        <div style={{ margin: '3rem 2rem 3rem 0' }}>
          <h3>Login to your account</h3>
        </div>
        <p className="m-0 p-0 login-text ">Login Id</p>
        <input
          className="login-input-box col-12"
          placeholder="email-id / phone number"
          id="id"
          type="text"
          onChange={(e) => {
            setlogin_id(e.target.value);
          }}
        />
        <p className="m-0 p-0 login-text">Password</p>
        <input
          className="login-input-box col-12"
          placeholder="password"
          id="pass"
          type={passwordType}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />

        <button className="border-0 bg-transparent d-flex align-items-center" onClick={togglePassword}>
          {passwordType === 'password' ? (
            <>
              {' '}
              <input type="checkbox" />
              <label htmlFor="">&nbsp;show password</label>
            </>
          ) : (
            <>
              <input type="checkbox" defaultChecked />
              <label htmlFor="">&nbsp;hide password</label>
            </>
          )}
        </button>
        <br />

        {auth ? <p>Wrong id or password</p> : null}
        <div className="d-flex justify-content-center ">
          <button className="book-button button-color m-0" onClick={() => getData(login_id, password)} style={{ padding: '0.8rem 1.8rem' }}>
            Login
          </button>
          &nbsp; &nbsp;
          <Link to="/phoneauth">
            <button className="button-color book-button m-0">Login with OTP</button>
          </Link>
        </div>

        <div className="d-flex justify-content-center"></div>

        <p className="p-0 mt-4 mb-0">
          Create an account?{' '}
          <Link to="/SignUp" className="login-link">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmployeeLogin;
