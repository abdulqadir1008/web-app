import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../components/Cookies';
import HeadersLogo from '../assets/HeadersLogo.png';
import ProfileImage from '../assets/ProfileImage.jpg';
import axios from 'axios';

import { CustomerDetailsQuery } from '../graphqlQueries/CustomerDetailsQuery';
import './Layout.css';
import { resolvePostApiWithHeaders } from '../Common/ResolveApi';

const Header = () => {
  const isLogin = getCookie('Customer_access_token');
  const [customerDetails, setCustomerDetails] = useState({ display_name: '', referral_code: '', kyc_status: true });
  let Token = getCookie('Customer_access_token');
  const CustomerDetailsData = async () => {
    try {
      const { getCustomerDetails } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, CustomerDetailsQuery(), Token);
      setCustomerDetails({ display_name: getCustomerDetails.display_name, referral_code: getCustomerDetails.referral_code, kyc_status: getCustomerDetails.kyc_status });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      CustomerDetailsData();
    }
  }, [isLogin]);

  const navigate = useNavigate();
  const handleLogOut = () => {
    removeCookie('Customer_access_token');
    window.location.reload();
    navigate('/');
  };
  const menuIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24 " height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );
  return (
    <>
      <nav className=" header-footer-color navbar  navbar-main sticky-top">
        <div className="container-fluid d-flex">
          <div className="d-flex align-items-center">
            <Link to="/">
              <img src={HeadersLogo} className="header-logo" alt="..." />
            </Link>
            {/* <p className="text-light p-0 m-0 ps-4 fw-semibold " style={{ fontSize: '1.6rem' }}>
              Hyderabad
            </p> */}
          </div>
          <div className="d-flex desktop-view">
            <ul className=" d-flex align-items-center my-0 px-0 list-unstyled mx-5 ">
              {/* {customerDetails.kyc_status ? null : (
                <li>
                  <Link className=" mx-3 text-decoration-none text-white normal-text" to="/Profile">
                    <button className="border border-1 border-danger text-danger normal-text blinking-text bg-light p-1 rounded-2">KYC verification pending</button>
                  </Link>
                </li>
              )} */}
              <li>
                <Link className=" mx-3 text-decoration-none text-white normal-text" to="/">
                  Home
                </Link>
              </li>
              {/* <li>
                <Link className=" mx-3 text-decoration-none text-white normal-text" to="/aboutus">
                  About Us{' '}
                </Link>
              </li> */}
              <li>
                <Link className=" mx-3  text-decoration-none text-white normal-text  " to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>

            {isLogin ? (
              <div className="btn-group">
                <button type="button" className="btn btn-secondary bg-transparent border-0 dropdown-toggle normal-text p-0" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                  {customerDetails.display_name} <img src={ProfileImage} className=" mx-1 rounded-circle profile-image" />
                </button>

                <ul className="dropdown-menu  header-footer-color border-0 mt-2 dropdown-menu-end dropdown-menu-lg end-0 normal-text" style={{ width: '100%' }}>
                  <li className="dropdown-item dropdown-item-nav " style={{ color: 'rgb(60, 185, 139) ' }}>
                    <div style={{ color: 'rgb(60, 185, 139) ' }}>
                      Referral code <br /> {customerDetails.referral_code}
                    </div>
                  </li>
                  <li>
                    <Link className="dropdown-item dropdown-item-nav normal-text " to="/Profile">
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <button className="px-2 mx-3 py-1 my-1 button-box orange-button border-0 normal-text" onClick={handleLogOut}>
                        Log Out
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="text-decoration-none" to="/login">
                <div className="navbar" id=" navbarSupportedContent">
                  <div className="btn-group">
                    <button type="button" className=" text-decoration-none btn btn-secondary bg-transparent border-0 normal-text fw-semibold">
                      SignIn/Register
                    </button>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="mobile-view">
            <div className=" navbar " id="navbarSupportedContent">
              {customerDetails.kyc_status ? null : (
                <li>
                  <Link className=" mx-3 text-decoration-none text-white normal-text" to="/Profile">
                    <button className="border border-1 border-danger text-danger normal-text blinking-text bg-light p-1 rounded-2">KYC verification pending</button>
                  </Link>
                </li>
              )}
              <div className="btn-group">
                {isLogin ? (
                  <button type="button" className="btn btn-secondary bg-transparent dropdown-toggle border-0 p-1 normal-text" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                    {customerDetails.display_name} <img src={ProfileImage} className="mx-1 rounded-circle" width="30rem" height="30rem" />
                  </button>
                ) : (
                  <Link className="text-decoration-none" to="/login">
                    <div className="navbar" id=" navbarSupportedContent">
                      <div className="btn-group">
                        <button type="button" className=" text-decoration-none btn btn-secondary mx-3 px-0 bg-transparent border-0 normal-text fw-semibold">
                          SignIn/Register
                        </button>
                      </div>
                    </div>
                  </Link>
                )}
                <ul className="dropdown-menu header-footer-color dropdown-menu-nav border-0 mt-2 dropdown-menu-end dropdown-menu-lg end-0 normal-text">
                  {isLogin ? (
                    <>
                      <li className="dropdown-item dropdown-item-nav " style={{ color: 'rgb(60, 185, 139) ' }}>
                        <div style={{ color: 'rgb(60, 185, 139) ' }}>
                          Referral code <br /> {customerDetails.referral_code}
                        </div>
                      </li>
                      <li>
                        <Link to="/">
                          <button className="px-2 mx-3 py-1 my-1 button-box orange-button border-0 normal-text" onClick={handleLogOut}>
                            Log Out
                          </button>
                        </Link>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
