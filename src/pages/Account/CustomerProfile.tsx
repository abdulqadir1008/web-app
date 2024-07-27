import axios from 'axios';
import React, { useEffect, useState } from 'react';
import KYC from './KYC';
import MyAccount from './MyAccount';
import MyBookings from './MyBookings';
import { UpdateCustomerQuery, CustomerDetailsQuery } from '../../graphqlQueries/CustomerDetailsQuery';

import ContactUs from '../infoPages/ContactUs';
import { getCookie } from '../../components/Cookies';
import CarListingPage from '../CarListingPage';
import { resolvePostApiWithHeaders } from '../../Common/ResolveApi';
import TermsAndCondition from '../infoPages/TermsAndCondition';
import './Account.css';
import { KycStatusQuery } from '../../graphqlQueries/KycQuery';
import approved from '../../assets/Kyc/approved.png';
import cross from '../../assets/Kyc/cross.png';
import warning from '../../assets/Kyc/warning.png';
import { VerificationStatus } from './AccountENUM';

const CustomerProfile = (props: any) => {
  const [SendDetails, setSendDetails] = useState();
  const [kycStatus, setKycStatus] = useState<any>({ aadhar_id: '', pan_id: '', driving_license_id: '', aadhar_status: '', pan_status: '', driving_license_status: '' });
  let Token = getCookie('Customer_access_token');

  const UpdateCustomerData = async (FirstName: any, DisplayName: any, EmailId: any, PhoneNumber: any, DateOfBirth: any) => {
    try {
      await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, UpdateCustomerQuery(FirstName, DisplayName, EmailId, PhoneNumber, DateOfBirth), Token);
      window.location.reload();
    } catch (error) {
      // console.log(error)
    }
  };

  const CustomerDetailsData = async () => {
    let Token = getCookie('Customer_access_token');
    try {
      const { getCustomerDetails } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, CustomerDetailsQuery(), Token);
      setSendDetails(getCustomerDetails);
    } catch (error) {
      // console.log(error)
    }
  };
  const KycStatusDetails = async () => {
    const { kycVerificationStatusDetails } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, KycStatusQuery(), Token);
    setKycStatus(kycVerificationStatusDetails);
  };
  useEffect(() => {
    CustomerDetailsData();
    KycStatusDetails();
  }, []);
  useEffect(() => {
    // props.kycstatus(kycStatus);
  }, [kycStatus]);
  const CustomerDetails = (FirstName: any, DisplayName: any, EmailId: any, PhoneNumber: any, DateOfBirth: any) => {
    UpdateCustomerData(FirstName, DisplayName, EmailId, PhoneNumber, DateOfBirth);
  };
  const { aadhar_status, pan_status, driving_license_status } = kycStatus;
  return (
    <div className="d-flex customer-profile mobile-view-profile mt-lg-5 pt-lg-5 mt-2 " style={{ width: '100%', height: 'auto' }}>
      <nav className="container-fluid   mt-2 md-2 rounded-start rounded-bottom rounded-end rounded-5 col-lg-2 m-0 p-0 " style={{ minWidth: '14rem' }}>
        <div className="nav nav-tabs mobile-view-profile-navbar  m-0 p-0 profile-left-section" id="nav-tab" role="tablist" style={{ minWidth: '14rem' }}>
          <div className="button-align justify-content-center col-12">
            <button
              className="btn heading-text button-tabs lk border-white rounded-0 profile-left-heading col-lg-12 col-md-4 col-5 kl active m-0  my-1 p-3 px-lg-5 d-flex justify-content-start align-items-center my-acc-m"
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
              className="btn heading-text border-white lk rounded-0 m-0 p-0 profile-left-heading col-lg-12 col-md-4 col-5 p-3 kl px-lg-5 d-flex my-1 justify-content-start button-tabs align-items-center"
              id="nav-KYC-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-KYC"
              type="button"
              role="tab"
              aria-controls="nav-KYC"
              aria-selected="true"
            >
              KYC
              {aadhar_status === VerificationStatus.NOT_VERIFIED && pan_status === VerificationStatus.NOT_VERIFIED && driving_license_status === VerificationStatus.NOT_VERIFIED ? (
                <p className="p-0 m-0 text-danger small-text ">&nbsp;&nbsp;(Verification pending)</p>
              ) : null}
              {aadhar_status === VerificationStatus.VERIFIED && pan_status === VerificationStatus.VERIFIED && driving_license_status === VerificationStatus.VERIFIED ? (
                <img className="verification-status-img" src={approved} alt="" />
              ) : aadhar_status === VerificationStatus.FAILED || pan_status === VerificationStatus.FAILED || driving_license_status === VerificationStatus.FAILED ? (
                <img className="verification-status-img" src={cross} alt="" />
              ) : aadhar_status === VerificationStatus.PENDING || pan_status === VerificationStatus.PENDING || driving_license_status === VerificationStatus.PENDING ? (
                <img className="verification-status-img" src={warning} alt="" />
              ) : aadhar_status === VerificationStatus.VERIFIED || pan_status === VerificationStatus.VERIFIED || driving_license_status === VerificationStatus.VERIFIED ? (
                <img className="verification-status-img" src={warning} alt="" />
              ) : null}
            </button>
          </div>
          {/* <button
            className="btn border-white lk rounded-0 m-0 p-0 profile-left-heading col-lg-12 col-md-4 col-6 p-3 ps-5 d-flex my-3 justify-content-start button-tabs align-items-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop "
          >
            My Listing
          </button> */}
          <div className="button-align justify-content-center col-12">
            <button
              className="btn heading-text border-white lk rounded-0 m-0 p-0 profile-left-heading col-lg-12 col-md-4 col-5 p-3 kl px-lg-5 d-flex my-1 justify-content-start button-tabs align-items-center"
              id="nav-MyBookings-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-MyBookings"
              type="button"
              role="tab"
              aria-controls="nav-MyBookings"
              aria-selected="false"
            >
              My Bookings
            </button>
            <button
              className="btn  heading-text border-white lk rounded-0 m-0 p-0 profile-left-heading col-lg-12 col-md-4 col-5 p-3 px-0 ps-lg-5 d-flex my-1 justify-content-start button-tabs align-items-center kl"
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
          </div>
          <div className="button-align justify-content-center col-12">
            <button
              className="btn heading-text border-white lk  co-m rounded-0 m-0 p-0 my-1 profile-left-heading col-lg-12 col-md-4 col-5 p-3 px-lg-5  d-flex justify-content-start button-tabs kl align-items-center"
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
        </div>
      </nav>
      <div className="tab-content profile-right-section" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-MyAccount" role="tabpanel" aria-labelledby="nav-MyAccount-tab" tabIndex={0}>
          <MyAccount Update={CustomerDetails} Details={SendDetails} kycStatus={kycStatus} />
        </div>
        <div className="tab-pane fade" id="nav-KYC" role="tabpanel" aria-labelledby="nav-KYC-tab" tabIndex={0}>
          <KYC kycStatus={kycStatus} />
        </div>
        <div className="tab-pane fade" id="nav-MyBookings" role="tabpanel" aria-labelledby="nav-MyBookings-tab" tabIndex={0}>
          <MyBookings />
        </div>
        {/* <div className="desktop-view">
          <CarListingPage />
        </div> */}
        <div className="tab-pane fade" id="nav-TermsAndConditions" role="tabpanel" aria-labelledby="nav-TermsAndConditions-tab" tabIndex={0}>
          <TermsAndCondition />
        </div>
        <div className="tab-pane fade" id="nav-ContactUs" role="tabpanel" aria-labelledby="nav-ContactUs-tab" tabIndex={0}>
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
