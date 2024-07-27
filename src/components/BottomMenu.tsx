import React from 'react';
import { Link } from 'react-router-dom';
import CalendarIconBM from '../assets/CalendarIconBM.png';
import HamburgerIconBM from '../assets/HamburgerIconBM.png';
import HomeIconBM from '../assets/HomeIconBM.png';
import ProfileIconBM from '../assets/ProfileIconBM.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../components/Cookies';
import axios from 'axios';

import { CustomerDetailsQuery } from '../graphqlQueries/CustomerDetailsQuery';
import './Component.css';

const BottomMenu = () => {
  const isLogin = getCookie('Customer_access_token');
  const [DisplayName, setDisplayName] = useState();
  const [referralCode, setReferralCode] = useState();
  const CustomerDetailsData = async () => {
    let Token = getCookie('Customer_access_token');
    try {
      const config = { headers: { Authorization: `Bearer ${Token}` } };
      const {
        data: {
          data: { getCustomerDetails }
        }
      }: any = await axios.post(import.meta.env.VITE_BACKEND_BASE_URL, { query: CustomerDetailsQuery() }, config);
      setDisplayName(getCustomerDetails.display_name);
      setReferralCode(getCustomerDetails.referral_code);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isLogin) {
      CustomerDetailsData();
    }
  }, []);
  const navigate = useNavigate();
  const handleLogOut = () => {
    removeCookie('Customer_access_token');
    window.location.reload();
    navigate('/');
  };
  return (
    <>
      <div className="bottom-menu  border-top header-footer-color mobile-view">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/">
            <img src={HomeIconBM} className="bottom-menu-icon" alt="" />
          </Link>
          <Link to="/mybookings">
            <img src={CalendarIconBM} className="bottom-menu-icon" alt="" />
          </Link>
          <Link to="/Profile">
            <img src={ProfileIconBM} className="bottom-menu-icon" alt="" />
          </Link>
          {isLogin ? (
            <>
              <button type="button" className="bottom-menu-icon border-0 bg-transparent" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={HamburgerIconBM} className="bottom-menu-icon" alt="" />
              </button>

              <ul className="dropdown-menu  orange-button border-0 mt-2 dropdown-menu-end dropdown-menu-lg end-0 normal-text">
                <li className="dropdown-item dropdown-item-nav " style={{ color: 'rgb(60, 185, 139) ' }}>
                  <div style={{ color: ' rgb(24, 16, 54)' }}>
                    Referral code <br /> {referralCode}
                  </div>
                </li>
                <li>
                  <Link className="dropdown-item  header-text " to="/Profile">
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <button className="px-2 mx-3 py-1 my-1 button-box book-button-color border-0 normal-text" onClick={handleLogOut}>
                      Log Out
                    </button>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <Link className="text-decoration-none d-flex" to="/login">
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
      </div>
    </>
  );
};

export default BottomMenu;
