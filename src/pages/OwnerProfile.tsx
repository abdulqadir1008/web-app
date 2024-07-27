import React, { useEffect, useState } from 'react';
import DesktopCarListingPage from './DesktopCarListingPage';
import ContactUs from './infoPages/ContactUs';
import KYC from './Account/KYC';
import MyAccount from './Account/MyAccount';
import MyBookings from './Account/MyBookings';
import CarListingPage from './CarListingPage';

import axios from 'axios';
import { GetOwnerDetailsQuery, OwnerDetailsUpdateQuery } from '../graphqlQueries/OwnerQuery';
import { I_OwnerDetails } from '../types/OwnerInterfaces';
import { getCookie } from '../components/Cookies';
import { resolvePostApiWithHeaders } from '../Common/ResolveApi';

const Profile = () => {
  let Token = getCookie('Owner_access_token');

  const [GetOwnerDetails, setGetOwnerDetails] = useState<I_OwnerDetails>();
  const GetOwnerDetailsData = async () => {
    try {
      const { getOwnerDetails } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, GetOwnerDetailsQuery(), Token);
      setGetOwnerDetails(getOwnerDetails);
    } catch (error) {}
  };

  useEffect(() => {
    GetOwnerDetailsData();
  }, []);

  const OwnerDetailsUpdate = async (FullName: any, DisplayName: any, EmailId: any, PhoneNumber: any) => {
    let Token = getCookie('Owner_access_token');
    try {
      // const config = { headers: { Authorization: `Bearer ${Token}` } };
      // const data: any = await axios.post(import.meta.env.VITE_BACKEND_BASE_URL, { query: OwnerDetailsUpdateQuery(FullName, DisplayName, EmailId, PhoneNumber) }, config);
      const { UpdateOwner } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, OwnerDetailsUpdateQuery(FullName, DisplayName, EmailId, PhoneNumber), Token);
      return UpdateOwner;
    } catch (error) {
      alert(error);
    }
  };

  const UpdateOwnerDetails = (FullName: any, DisplayName: any, EmailId: any, PhoneNumber: any) => {
    OwnerDetailsUpdate(FullName, DisplayName, EmailId, PhoneNumber);
  };

  return (
    <div className="d-flex  mt-lg-5 pt-lg-5 mt-2 " style={{ width: '100%', height: 'auto' }}>
      <nav className="container-fluid sticky-lg-top mt-2 md-2 rounded-start rounded-bottom rounded-end rounded-5 desktop-view col-lg-2 m-0 p-0 " style={{ minWidth: '21rem' }}>
        <div className="nav nav-tabs row m-0 p-0 profile-left-section" id="nav-tab" role="tablist" style={{ minWidth: '21rem' }}>
          <button
            className="btn border-white rounded-0 profile-left-heading active m-0 mt-5 my-3 p-3 px-5 d-flex justify-content-start"
            id="nav-MyAccount-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-MyAccount"
            type="button"
            role="tab"
            aria-controls="nav-MyAccount"
            aria-selected="true"
          >
            My Account
          </button>
          <button
            className="btn border-white rounded-0 m-0 p-0 profile-left-heading p-3 px-5 my-3 d-flex justify-content-start"
            id="nav-KYC-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-KYC"
            type="button"
            role="tab"
            aria-controls="nav-KYC"
            aria-selected="true"
          >
            KYC
          </button>

          <button
            className="btn border-white rounded-0 m-0 p-0 profile-left-heading p-3 px-5 d-flex my-3 justify-content-start"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop "
          >
            My Listing
          </button>

          <button
            className="btn border-white rounded-0 m-0 p-0 profile-left-heading p-3 ps-5 d-flex my-3 justify-content-start"
            id="nav-TermsAndConditions-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-TermsAndConditions"
            type="button"
            role="tab"
            aria-controls="nav-TermsAndConditions"
            aria-selected="false"
          >
            Terms and Conditions
          </button>
          <button
            className="btn border-white rounded-0 m-0 p-0 my-3 profile-left-heading p-3 px-5 mb-5 d-flex justify-content-start"
            id="nav-ContactUs-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-ContactUs"
            type="button"
            role="tab"
            aria-controls="nav-ContactUs"
            aria-selected="false"
          >
            ContactUs
          </button>
        </div>
      </nav>
      <div className="tab-content col-lg-10 col-12" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-MyAccount" role="tabpanel" aria-labelledby="nav-MyAccount-tab" tabIndex={0}>
          <MyAccount Update={UpdateOwnerDetails} Details={GetOwnerDetails} />
        </div>
        <div className="tab-pane fade" id="nav-KYC" role="tabpanel" aria-labelledby="nav-KYC-tab" tabIndex={0}>
          <KYC />
        </div>
        <div className="desktop-view">
          <CarListingPage />
        </div>
        <div className="tab-pane fade" id="nav-TermsAndConditions" role="tabpanel" aria-labelledby="nav-TermsAndConditions-tab" tabIndex={0}>
          Terms
        </div>
        <div className="tab-pane fade" id="nav-ContactUs" role="tabpanel" aria-labelledby="nav-ContactUs-tab" tabIndex={0}>
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default Profile;
