import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../../components/Cookies';
import { createCustomerProfileQuery } from '../../graphqlQueries/CustomerDetailsQuery';
import WelcomeBackLogo from '../../assets/WelcomeBackLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { resolvePostApi } from '../../Common/ResolveApi';
import './SignIn.css';

interface I_RegistrationFormData {
  displayName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  dateOfBirth: string;
  referred_by?: string;
  rePassword?: string;
}

const initialDateTime = () => {
  let datetime = new Date();
  let year = datetime.getFullYear();
  let month;
  if (datetime.getMonth() + 1 <= 9) {
    month = '0' + (datetime.getMonth() + 1);
  } else {
    month = datetime.getMonth() + 1;
  }
  let date;
  if (datetime.getDate() <= 9) {
    date = '0' + datetime.getDate();
  } else {
    date = datetime.getDate();
  }
  let hours;
  if (datetime.getUTCHours() + 1 <= 9) {
    hours = '0' + (datetime.getUTCHours() + 1);
  } else {
    hours = datetime.getUTCHours() + 1;
  }
  let min;
  if (datetime.getUTCMinutes() <= 9) {
    min = '0' + datetime.getUTCMinutes();
  } else {
    min = datetime.getUTCMinutes();
  }
  return { year, month, date, hours, min };
};

export const getStartingInputData = () => {
  const { year, month, date, hours, min } = initialDateTime();
  const startMaxYear = year - 18;
  const startMaxMonth = month;
  const startMaxDate = date;
  const startMaxHour = hours;
  const startMaxMin = min;
  const SMaxValue = `${startMaxYear}-${startMaxMonth}-${startMaxDate}T${startMaxHour}:00:00.000Z`;
  return SMaxValue;
};

const CustomerSignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const SMaxValue = getStartingInputData();
  const navigate = useNavigate();
  useEffect(() => {
    let Token = getCookie('Customer_access_token');
    if (Token) {
      window.location.reload();
      navigate(-1);
    }
  }, []);
  const [dobValue, setDobValue] = React.useState<any>();
  const initialValues: I_RegistrationFormData = { fullName: '', displayName: '', email: '', phoneNumber: '', password: '', dateOfBirth: '', referred_by: '', rePassword: '' };
  const [formValues, setFormValues] = useState<any>(initialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [rePasswordType, setRePasswordType] = useState('password');
  const togglePassword = (e: any) => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  const toggleRePassword = (e: any) => {
    if (rePasswordType === 'password') {
      setRePasswordType('text');
      return;
    }
    setRePasswordType('password');
  };
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === 'fullName') {
      const inputName = value;
      const capitalizedName = inputName.charAt(0).toUpperCase() + inputName.slice(1);
      setFormValues({ ...formValues, [name]: capitalizedName });
    } else if (name === 'email') {
      const inputEmail = value;
      const lowerCaseEmail = inputEmail.toLowerCase();
      setFormValues({ ...formValues, [name]: lowerCaseEmail });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const handleSubmit = () => {
    setFormValues({ ...formValues, dateOfBirth: dobValue });
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const getData = async (formValues: any) => {
    try {
      const { createCustomerProfile } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, createCustomerProfileQuery(formValues));
      setCookie('Customer_access_token', createCustomerProfile.access_token);
      navigate(-2);
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };
  useEffect(() => {
    if (errorMessage.length) {
      setErrorMessage('');
    }
  }, [formValues]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      getData(formValues);
    }
  }, [formErrors]);

  const validate = (values: { fullName: any; displayName?: string; email?: string; phoneNumber?: string; password?: string; rePassword?: string; dateOfBirth: any }) => {
    const errors: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneNumberRegex = /^\d{10}$/;
    const phoneNumberStartRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!values.fullName) {
      errors.fullName = 'Full Name is required!';
    }
    if (!values.displayName) {
      errors.displayName = 'Display Name is required!';
    }
    if (!values.email) {
      errors.email = 'Email id is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }

    if (!values.phoneNumber || values.phoneNumber === 'undefined') {
      errors.phoneNumber = 'Phone Number is required!';
    } else if (!phoneNumberRegex.test(values.phoneNumber!)) {
      errors.phoneNumber = 'Phone Number should be atleast 10 digit!';
    } else if (!phoneNumberStartRegex.test(values.phoneNumber!)) {
      errors.phoneNumber = 'Phone Number is not valid';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length > 12 || values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters and cannot exceed 12 characters!';
    } else if (values.password !== values.rePassword || !values.rePassword) {
      errors.rePassword = 'Password should be same';
    }
    if (!values.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required as per aadhar';
    }
    return errors;
  };
  return (
    <div className="d-flex vh-100 align-items-center">
      <div className=" row col-lg-5 col-11 mx-auto shadow border rounded-4 sign-up-form-box py-3 p-2 normal-text">
        <div className="d-flex justify-content-center">
          <img src={WelcomeBackLogo} width="80rem" alt="..." />
        </div>
        <div className="d-flex justify-content-center heading-text welcome-text my-2">Welcome to INFILA</div>
        <div className="my-1">
          <h3>Create your account</h3>
        </div>
        <div className="d-flex m-0">
          <div className="col-6 px-2">
            <label className="form-label">
              Full name <span className="small-text lighter-text">(as per aadhar)</span>
            </label>
            <input type="text" placeholder="Full name" name="fullName" className="form-control small-text  " value={formValues.fullName} onChange={handleChange} />
            <p style={{ fontWeight: '400', color: 'red' }}>{formErrors.fullName}</p>
          </div>
          <div className="col-6 px-2">
            <label className="form-label">Display name</label>
            <input type="text" placeholder="Display name" name="displayName" className="form-control small-text " value={formValues.displayName} onChange={handleChange} />
            <p style={{ fontWeight: '400', color: 'red' }}>{formErrors.displayName}</p>
          </div>
        </div>
        <div className="d-flex m-0">
          <div className="col-6 px-2">
            <label className="form-label">Email id</label>
            <input type="email" placeholder="Email id" name="email" className="form-control small-text " value={formValues.email} onChange={handleChange} />
            <p style={{ fontWeight: '400', color: 'red' }}>{formErrors.email}</p>
          </div>
          <div className="col-6 px-2">
            <label className="form-label">Phone Number</label>
            <input type="number" placeholder="phone number" name="phoneNumber" className="form-control small-text " value={formValues.phoneNumber} onChange={handleChange} />
            <p style={{ fontWeight: '400', color: 'red' }}>{formErrors.phoneNumber}</p>
          </div>
        </div>

        <div className="d-flex  m-0 ">
          <div className="col-6 px-2 ">
            <label className="form-label">Password</label>
            <input type={passwordType} placeholder="Password" name="password" className="form-control small-text " value={formValues.password} onChange={handleChange} />
            {formErrors.password ? (
              <p className="p-0 m-0" style={{ fontWeight: '400', color: 'red' }}>
                {formErrors.password}
              </p>
            ) : null}
            <button
              className="border-0 bg-transparent d-flex align-items-center normal-text mb-2 mt-1 my-0"
              name="password"
              onClick={(e) => {
                togglePassword(e);
              }}
              style={{ margin: '0.7rem 0' }}
            >
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
          </div>
          <div className="col-6 px-2 ">
            <label className="form-label">Re-enter Password</label>
            <input type={rePasswordType} placeholder="Re-enter password" name="rePassword" className="form-control small-text " value={formValues.rePassword} onChange={handleChange} />
            {formErrors.rePassword ? (
              <p className="p-0 m-0" style={{ fontWeight: '400', color: 'red' }}>
                {formErrors.rePassword}
              </p>
            ) : null}
            <button
              className="border-0 bg-transparent d-flex align-items-center normal-text mb-2 mt-1 my-0"
              name="rePassword"
              onClick={(e) => {
                toggleRePassword(e);
              }}
              style={{ margin: '0.7rem 0' }}
            >
              {rePasswordType === 'password' ? (
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
          </div>
        </div>
        <div className="d-flex  m-0 ">
          <div className="col-6 px-2">
            <div className="form-label">
              Date of Birth <span className="small-text">(atleast 18years old)</span> <br />
              <span className="small-text lighter-text">(as per aadhar)</span>
            </div>
            <DatePicker
              className="date-box w-100 ps-2 small-text"
              placeholderText="Date of birth"
              selected={dobValue}
              onChange={(date) => setDobValue(date!)}
              dateFormat="d MMMM, yyyy "
              maxDate={new Date(getStartingInputData())}
              scrollableYearDropdown
              showYearDropdown
              yearDropdownItemNumber={110}
              showMonthDropdown
            />
            <p style={{ fontWeight: '400', color: 'red' }}>{formErrors.dateOfBirth}</p>
          </div>
          <div className="col-6 px-2 ">
            <label className="form-label">Refferal Code</label>
            <input type="text" placeholder="referral code" name="referred_by" className="form-control small-text " value={formValues.referred_by} onChange={handleChange} />
            {/* <p style={{  fontWeight: '400', color: 'red' }}>{formErrors.password}</p> */}
          </div>
        </div>
        {errorMessage.length ? <p>{errorMessage}</p> : null}
        <div className="d-flex align-items-end  justify-content-between m-0 mt-1">
          <button className="button-box border-0 my-3 book-button-color " onClick={handleSubmit}>
            Submit
          </button>

          <p className="p-0 m-0 ">
            Have an account?{' '}
            <Link to="/login" className="login-link normal-text">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignUp;
