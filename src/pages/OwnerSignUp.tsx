import axios from 'axios';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';

import { getCookie, setCookie } from '../components/Cookies';
import { OwnerSignUpQuery } from '../graphqlQueries/OwnerQuery';
import WelcomeBackLogo from '../assets/WelcomeBackLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { resolvePostApi } from '../Common/ResolveApi';

interface I_RegistrationFormData {
  displayName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: number;
  password?: string;
}
const OwnerSignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let Token = getCookie('Owner_access_token');
    if (Token) {
      window.location.reload();
      navigate(-1);
    }
  }, []);

  const initialValues: I_RegistrationFormData = { fullName: '', displayName: '', email: '', phoneNumber: undefined, password: '' };
  const [formValues, setFormValues] = useState<any>(initialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      if (isNaN(value)) return false;
      setFormValues({ ...formValues, [name]: value });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const getData = async (formValues: any) => {
    try {
      const { createOwnerProfile } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, OwnerSignUpQuery(formValues));
      setCookie('Owner_access_token', createOwnerProfile.access_token);
    } catch (error) {}
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      getData(formValues);
    }
  }, [formErrors]);

  const validate = (values: { fullName: any; displayName?: string; email?: string; phoneNumber?: string; password?: string }) => {
    const errors: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fullName) {
      errors.fullName = 'fullname is required!';
    }
    if (!values.displayName) {
      errors.displayName = 'displayname is required!';
    }
    if (!values.email) {
      errors.email = 'email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'phonenumber is required!';
    }
    if (!values.password) {
      errors.password = 'password is required!';
    } else if (values.password.length > 12 || values.password.length < 4) {
      errors.password = 'password must be more than 4 characters and cannot exceed 12 characters!';
    }
    return errors;
  };

  return (
    <div className="d-flex vh-100 align-items-center">
      <form className=" row col-lg-5 col-11 mx-auto shadow border rounded-4 sign-up-form-box" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <img src={WelcomeBackLogo} width="70rem" alt="..." />
        </div>
        <div className="d-flex justify-content-center welcome-text" style={{ marginBottom: '1rem' }}>
          Welcome to INFILA
        </div>
        <div style={{ margin: '3rem 2rem 3rem 0' }}>
          <h2>Create your account</h2>
        </div>
        <div className="d-flex m-0">
          <div className="col-6 px-2">
            <label className="form-label">Full name</label>
            <input type="text" placeholder="Full name" name="fullName" className="form-control" value={formValues.fullName} onChange={handleChange} style={{ padding: '1rem' }} />
            <p>{formErrors.fullName}</p>
          </div>
          <div className="col-6 px-2">
            <label className="form-label">Display name</label>
            <input type="text" placeholder="Display name" name="displayName" className="form-control" value={formValues.displayName} onChange={handleChange} style={{ padding: '1rem' }} />
            <p>{formErrors.displayName}</p>
          </div>
        </div>
        <div className="d-flex m-0">
          <div className="col-6 px-2">
            <label className="form-label">Email id</label>
            <input type="email" placeholder="Email" name="email" className="form-control" value={formValues.email} onChange={handleChange} style={{ padding: '1rem' }} />
            <p>{formErrors.email}</p>
          </div>
          <div className="col-6 px-2">
            <label className="form-label">Phone Number</label>
            <input type="number" placeholder="phone number" name="phoneNumber" className="form-control" value={formValues.phoneNumber} onChange={handleChange} style={{ padding: '1rem' }} />
            <p>{formErrors.phoneNumber}</p>
          </div>
        </div>
        <div className="d-flex m-0">
          <div className="col-12 px-2">
            <label className="form-label">Password</label>
            <input type="password" placeholder="Password" name="password" className="form-control" value={formValues.password} onChange={handleChange} style={{ padding: '1rem' }} />
            <p>{formErrors.password}</p>
          </div>
        </div>
        <div className="d-flex align-items-end  justify-content-between m-0">
          <button type="submit" className="button-color book-button ">
            Submit
          </button>

          <p className="p-0 m-0 ">
            Have an account?{' '}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OwnerSignUp;
