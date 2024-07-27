import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getCookie, setCookie } from '../../components/Cookies';
import { CustomerLoginQuery } from '../../graphqlQueries/CustomerDetailsQuery';
import WelcomeBackLogo from '../../assets/WelcomeBackLogo.png';
import { resolvePostApi } from '../../Common/ResolveApi';
import './SignIn.css';

const CustomerLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [login_id, setlogin_id] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const navigate = useNavigate();
  const passwordInputRef = useRef<any>(null);
  let Token = getCookie('Customer_access_token');

  useEffect(() => {
    if (Token) {
      window.location.reload();
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    if (errorMessage.length) {
      setErrorMessage('');
    }
  }, [login_id, password]);

  const getData = async (login_id: any, password: any) => {
    if (login_id === '' || password === '') {
      setErrorMessage('Login details required');
    } else {
      try {
        const { CustomerLogin } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, CustomerLoginQuery(login_id, password));
        setCookie('Customer_access_token', CustomerLogin.access_token);
        navigate(-1);
      } catch (e: any) {
        const originalErrorMessage = e.message;
        const capitalizedErrorMessage = originalErrorMessage
          .split(' ')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setErrorMessage(capitalizedErrorMessage);
      }
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
  const handleLoginKey = (event: any) => {
    if (event.key === 'Enter') {
      if (login_id != '') {
        event.preventDefault();
        passwordInputRef.current.focus();
      } else {
        setErrorMessage('Login id required');
      }
    }
  };
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      getData(login_id, password);
    }
  };
  return (
    <div className="d-flex  vh-100 align-items-center justify-content-center ">
      <div className="shadow border rounded-4 sign-up-form-box width-size">
        <div className="d-flex justify-content-center mb-3">
          <img src={WelcomeBackLogo} width="80rem" alt="..." />
        </div>
        <div className="d-flex justify-content-center heading-text welcome-text">Welcome back to INFILA</div>

        <div className="my-3 mt-4">
          <h3>Login to your account</h3>
        </div>
        <p className="m-0 p-0 normal-text my-1">Login Id</p>
        <input
          className="form-control login-input-box small-text col-12 p-2 "
          placeholder="email-id / phone number"
          id="id"
          type="text"
          onChange={(e) => {
            setlogin_id(e.target.value);
          }}
          onKeyDown={(e) => {
            handleLoginKey(e);
          }}
        />
        <p className="m-0 p-0 normal-text my-1 mt-2">Password</p>
        <input
          className="form-control login-input-box small-text col-12 p-2 "
          placeholder="password"
          id="pass"
          type={passwordType}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          ref={passwordInputRef}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        />

        <button className="border-0 bg-transparent d-flex align-items-center normal-text mt-2 my-0" onClick={togglePassword} style={{ margin: '0.7rem 0' }}>
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
        {errorMessage.length ? (
          <p className="normal-text p-0 m-0" style={{ color: 'red' }}>
            {errorMessage}
          </p>
        ) : null}
        {/* <div className="d-flex justify-content-start" style={{marginBottom:'1rem'}}>
          <Link to="/phoneauth" className="login-link">
            Login with OTP 
          </Link>
        </div> */}
        <div className="d-flex justify-content-center ">
          <button className="button-box border-0  heading-text book-button-color m-0" onClick={() => getData(login_id, password)}>
            Login
          </button>
          &nbsp; &nbsp;
          {/* <Link to="/phoneauth">
            <button className="button-color book-button m-0">Login with OTP</button>
          </Link> */}
        </div>
        {/* <div className="d-flex justify-content-center" style={{ marginTop: '2rem' }}>
          <h2>OR</h2>
        </div> */}
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

export default CustomerLogin;
