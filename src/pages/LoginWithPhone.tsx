import { Link, useNavigate } from 'react-router-dom';
import  WelcomeBackLogo  from '../assets/WelcomeBackLogo.png';
import {  ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ChangeEvent, useEffect, useState } from 'react';
import { auth } from '../firebase';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Back from '../assets/back.png';
import { getCookie } from '../components/Cookies';

const LoginWithPhone = () => {
    let Token = getCookie('Customer_access_token');
    const navigate = useNavigate();
    useEffect(() => {
      if (Token)  {
        window.location.reload();
        navigate(-1);
      }
    }, []);
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [OTP, setOTP] = useState<string>();
  const [Error, setError] = useState<string>();
  const [flag, setflag] = useState<boolean>(false);
  const [confirmObject, setconfirmObject] = useState<any>({});
  const [passwordType, setPasswordType] = useState('password');
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  function setUpRecaptcha(phoneNumber: any) {
    const reCaptcha = new RecaptchaVerifier('recaptcha-container', {
      size:'invisible'
    }, auth);
    reCaptcha.render();
    return signInWithPhoneNumber(auth, phoneNumber, reCaptcha);
  }
  const getOTP = async (e: any) => {
    e.preventDefault();
    setError('');
    if (phoneNumber === '' || phoneNumber === undefined) {
      return setError('please enter proper number');
    }
    try {
      const response = await setUpRecaptcha(phoneNumber);
      setconfirmObject(response)
      setflag(true)
    } catch (error: any) {
      setError(error.message)
    }
  };
  const verifyOTP = async ()=>{
    setError("");
if(OTP === "" || OTP === null)return;
try {
 await confirmObject.confirm(OTP);
   navigate("/");
} catch (error:any) {
  setError(error.message)
}
  }
  const handleBackButton = () => {
    navigate('/login');
  };
  return (
    <div className="d-flex  vh-100 align-items-center justify-content-center ">
      <div className="shadow border rounded-4 sign-up-form-box width-size">
        <div className="d-flex justify-content-center">
          <img src={WelcomeBackLogo} width="70rem" alt="..." />
        </div>
        <div className="d-flex justify-content-center welcome-text">Welcome back to INFILA</div>

        <div style={{ margin: '3rem 2rem 3rem 0' }}>
          <h3>Login to your account with OTP </h3>
        </div>

        {!flag ? (
          <>
            <p className="m-0 p-0 login-text ">Phone Number</p>
            <PhoneInput className="login-input-box col-12 " defaultCountry="IN" placeholder="Enter phone number" value={phoneNumber} onChange={setPhoneNumber} />
            <div className="" id="recaptcha-container" />
            {/* {auth ? <p>Wrong id or password</p> : null} */}
            <div className="d-flex justify-content-center">
              <button className="book-button button-color " type="submit" onClick={(e) => getOTP(e)} style={{ padding: '0.8rem 1.8rem' }}>
                Send OTP
              </button>
            </div>
            <div className="d-flex justify-content-start border rounded-circle" style={{ width: '4rem', height: '4rem', padding: '0.8rem', backgroundColor: 'rgb(60, 185, 139)' }}>
              <img
                src={Back}
                className="d-flex justify-content-center align-items-center"
                onClick={() => {
                  handleBackButton();
                }}
                alt=""
                style={{ width: '2.3rem', height: '2.3rem', cursor: 'pointer' }}
              />
            </div>
          </>
        ) : (
          <>
            <p className="m-0 p-0 login-text">OTP</p>
            <input
              className="login-input-box col-12"
              placeholder="enter OTP"
              id="pass"
              type="text"
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />
            <div className="d-flex justify-content-center">
              <button className="book-button button-color " type="submit" onClick={verifyOTP} style={{ padding: '0.8rem 1.8rem' }}>
                Submit otp
              </button>
            </div>
            <div className="d-flex justify-content-start border rounded-circle" style={{ width: '4rem', height: '4rem', padding: '0.8rem', backgroundColor: 'rgb(60, 185, 139)' }}>
              <img
                src={Back}
                className="d-flex justify-content-center align-items-center"
                onClick={() => {
                  handleBackButton();
                }}
                alt=""
                style={{ width: '2.3rem', height: '2.3rem', cursor: 'pointer' }}
              />
            </div>
          </>
        )}
        <br />

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

export default LoginWithPhone;
