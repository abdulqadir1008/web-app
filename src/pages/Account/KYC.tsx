import { Box, dividerClasses, Rating, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { MdCheck, MdEdit } from 'react-icons/md';
import { ImCheckmark } from 'react-icons/im';
import Human from '../assets/Human.png';
import Plus from '../assets/Plus.png';
import InputMask from 'react-input-mask';
import { resolvePostApiWithHeaders } from '../../Common/ResolveApi';
import { getCookie } from '../../components/Cookies';
import { AadhaarOtpQuery, AadharKycReloadCaptchaQuery, DrivingLicenseQuery, IntializeKycQuery, PanQuery, ValidateAadhaar } from '../../graphqlQueries/KycQuery';
import Timer from '../../Common/Timer';
import approved from '../../assets/Kyc/approved.png';
import cross from '../../assets/Kyc/cross.png';
import warning from '../../assets/Kyc/warning.png';
import { VerificationStatus } from './AccountENUM';

interface StatusImages {
  [key: string]: string;
}

const KYC = (props: any) => {
  let Token = getCookie('Customer_access_token');
  const [KycStatus, setKycStatus] = useState<any>({
    aadhar_id: '',
    pan_id: '',
    driving_license_id: '',
    aadhar_status: '',
    pan_status: '',
    driving_license_status: ''
  });
  const [aadhar, setAadhar] = useState('');
  const [aadharCaptcha, setAadharCaptcha] = useState('');
  const [aadharOtp, setAadharOtp] = useState('');
  const [aadharCaptchaBox, setAadharCaptchaBox] = useState<boolean>(false);
  const [aadharOtpBox, setAadharOtpBox] = useState<boolean>(false);
  const [aadharValidationMessage, setAadharValidationMessage] = useState('');
  const [pan, setPan] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [captchaImgStr, setCaptchaImgStr] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [TryAgain, setTryAgain] = useState('');
  const [ErrorMessage, setErrorMessage] = useState({ aadharError: '', drivingLicenseError: '', panError: '' });
  const AADHAR_REGEX = new RegExp('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}');
  const PAN_REGEX = new RegExp('^[A-Z]{5}[0-9]{4}[A-Z]{1}$');
  const DRIVING_REGEX14 = new RegExp('^[A-Z]{2}[0-9]{14}');
  const DRIVING_REGEX13 = new RegExp('^[A-Z]{2}[0-9]{13}');
  const handleAadharVerify = () => {
    if (AADHAR_REGEX.test(aadhar)) {
      initializeKYC();
    }
  };
  const handlePanVerify = () => {
    if (PAN_REGEX.test(pan)) {
      panVerification(pan);
    }
  };
  const handleDrivingLicenseVerify = () => {
    if (DRIVING_REGEX14.test(drivingLicense) || DRIVING_REGEX13.test(drivingLicense)) {
      drivingLiscVerification(drivingLicense);
    }
  };
  const drivingLiscVerification = async (drivingLicense: string) => {
    try {
      const { loadDrivingLicense } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, DrivingLicenseQuery(drivingLicense), Token);
      alert(loadDrivingLicense.message);
      window.location.reload();
    } catch (error: any) {
      setErrorMessage({ aadharError: '', drivingLicenseError: error.message, panError: '' });
    }
  };
  const panVerification = async (pan: string) => {
    try {
      const { loadPanCard } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, PanQuery(pan), Token);
      alert(loadPanCard.message);
      window.location.reload();
    } catch (error: any) {
      setErrorMessage({ aadharError: '', drivingLicenseError: '', panError: error.message });
      console.log(error);
    }
  };
  const initializeKYC = async () => {
    setErrorMessage({ aadharError: '', drivingLicenseError: '', panError: '' });
    try {
      const { InitializeAadharKyc } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, IntializeKycQuery(), Token);
      setCaptchaImgStr(InitializeAadharKyc.captchaImage);
      setTransactionId(InitializeAadharKyc.transaction_id);
      setAadharCaptchaBox(true);
    } catch (error: any) {
      setErrorMessage({ aadharError: error.message, drivingLicenseError: '', panError: '' });
      console.log(error);
    }
  };
  const generateAadharOtp = async (transaction_id: string, captcha: string, aadhaar_number: string) => {
    setErrorMessage({ aadharError: '', drivingLicenseError: '', panError: '' });
    try {
      const { generateAadharOtp } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, AadhaarOtpQuery(transaction_id, captcha, aadhaar_number), Token);
      setAadharCaptchaBox(false);
      setAadharOtpBox(true);
    } catch (error: any) {
      setErrorMessage({ aadharError: error.message, drivingLicenseError: '', panError: '' });
      console.log(error);
    }
  };
  const handleAadharCaptchaSubmit = () => {
    generateAadharOtp(transactionId, aadharCaptcha, aadhar);
  };
  const handleResendAadharOtp = (functionCall: boolean) => {
    if (functionCall) {
      generateAadharOtp(transactionId, aadharCaptcha, aadhar);
    }
  };
  const handleAadharValidate = async () => {
    setErrorMessage({ aadharError: '', drivingLicenseError: '', panError: '' });
    try {
      const { validateAadharOtp } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, ValidateAadhaar(aadhar, transactionId, aadharOtp), Token);
      // aadharValidationMessage = validateAadharOtp.message;
      setAadharValidationMessage(validateAadharOtp.message);
      alert(validateAadharOtp.message);
      window.location.reload();
    } catch (error: any) {
      setErrorMessage({ aadharError: error.message, drivingLicenseError: '', panError: '' });
      console.log(error);
    }
  };
  const aadharReloadCaptcha = async () => {
    setErrorMessage({ aadharError: '', drivingLicenseError: '', panError: '' });
    try {
      const { AadharKycReloadCaptcha } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, AadharKycReloadCaptchaQuery(transactionId), Token);
      setCaptchaImgStr(AadharKycReloadCaptcha.captchaImage);
    } catch (error: any) {
      setErrorMessage({ aadharError: error.message, drivingLicenseError: '', panError: '' });
    }
  };
  useEffect(() => {
    setKycStatus(props.kycStatus);
  }, [props.kycStatus]);
  const { aadhar_id, pan_id, driving_license_id, aadhar_status, pan_status, driving_license_status } = KycStatus;
  function AadharView(str: string) {
    const spacedStr = str.match(/.{1,4}/g)!.join(' ');
    return spacedStr;
  }
  function PanView(str: string) {
    const formattedStr = str.replace(/([A-Za-z]{5})([0-9]{4})([A-Za-z]{1})/, '$1 $2 $3');
    return formattedStr;
  }
  function DrivingLicenseView(str: string) {
    const formattedStr = str.replace(/([A-Za-z]{2})([0-9]{14})/, '$1 $2');
    return formattedStr;
  }
  const statusImage: StatusImages = {
    verified: approved,
    under_verification: warning,
    verification_failed: cross
  };
  const statusMessage: StatusImages = {
    verified: 'Verified',
    under_verification: 'Under verification',
    verification_failed: 'Verification failed'
  };
  const handleTryAgain = (e: any) => {
    setTryAgain(e.target.id);
  };
  const renderAadhar = () => {
    return (
      <div>
        <h3 className="profile-right-heading ps-0">Aadhar</h3>

        {aadhar_status !== VerificationStatus.NOT_VERIFIED && aadhar_id && TryAgain !== 'aadhar' ? (
          <div className="d-flex align-items-center">
            <div className="heading-text">{AadharView(aadhar_id)}</div>
            <img className="verification-status-img" src={statusImage[aadhar_status]} alt="" />
            <p className="p-0 m-0 ms-1">{statusMessage[aadhar_status]}</p>
          </div>
        ) : aadhar_status === '' || aadhar_status === VerificationStatus.NOT_VERIFIED || TryAgain === 'aadhar' ? (
          <div className="d-md-flex">
            <div>
              <InputMask
                disabled={aadharCaptchaBox}
                value={aadhar}
                className="mb-3 me-3 p-1 heading-text"
                mask="9999 9999 9999"
                placeholder="Enter aadhar number"
                maskChar=" "
                pattern="\d{4} \d{4} \d{4}"
                onChange={(e) => {
                  setAadhar(e.target.value.replaceAll(' ', ''));
                }}
              />
            </div>
            {aadharCaptchaBox ? (
              <div>
                <img className="border border-1 mx-2" src={`data:image/jpeg;base64,${captchaImgStr}`} alt="" />
                <button className="border-0 bg-transparent fs-3 me-2 m-0" onClick={aadharReloadCaptcha}>
                  ⟳
                </button>
                <input
                  aria-label="Enter the text shown in the image"
                  className="p-1 heading-text"
                  type="text"
                  placeholder="Enter captcha text"
                  onChange={(e) => {
                    setAadharCaptcha(e.target.value);
                  }}
                />
                <button className="button-box book-button-color border-0 heading-text ms-2" onClick={handleAadharCaptchaSubmit}>
                  Submit
                </button>
                {ErrorMessage.aadharError && (
                  <div className="d-flex">
                    <p className="p-o m-0 my-2 text-danger">{ErrorMessage.aadharError}</p>
                    <button
                      className="button-box book-button-color border-0 p-1 ms-2 normal-text"
                      id="aadhar"
                      onClick={(e) => {
                        handleTryAgain(e);
                        setAadharCaptchaBox(false);
                        setAadharOtpBox(false);
                        setErrorMessage({ aadharError: '', drivingLicenseError: '', panError: '' });
                        setAadhar('');
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            ) : aadharOtpBox ? null : (
              <div>
                <button className="button-box book-button-color border-0 heading-text" disabled={!AADHAR_REGEX.test(aadhar)} onClick={handleAadharVerify}>
                  Verify
                </button>
                {ErrorMessage.aadharError && <p className="p-o m-0 my-2 text-danger">{ErrorMessage.aadharError}</p>}
              </div>
            )}
            {aadharOtpBox ? (
              <div>
                <InputMask
                  mask="999999"
                  maskChar=" "
                  aria-label="Enter the text shown in the image"
                  className="p-1 heading-text"
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => {
                    setAadharOtp(e.target.value);
                  }}
                />
                <Timer timeSec={45} functionCall={handleResendAadharOtp} class={'p-1 m-0 my-1 text-light bg-primary rounded-2 normal-text'} />
                <button className="button-box book-button-color border-0 heading-text ms-2" onClick={handleAadharValidate}>
                  Submit OTP
                </button>
                <p className="p-o m-0 my-2">{aadharValidationMessage}</p>
                {ErrorMessage.aadharError && (
                  <div className="d-flex">
                    <p className="p-o m-0 my-2 text-danger">{ErrorMessage.aadharError}</p>
                    <button
                      className="button-box book-button-color border-0 p-1 ms-2 normal-text"
                      id="aadhar"
                      onClick={(e) => {
                        handleTryAgain(e);
                        setAadharCaptchaBox(false);
                        setAadharOtpBox(false);
                        setErrorMessage({ aadharError: '', drivingLicenseError: '', panError: '' });
                        setAadhar('');
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
        {}
      </div>
    );
  };
  const renderPan = () => {
    return (
      <div>
        <h3 className="profile-right-heading ps-0">Pan</h3>
        {pan_status !== VerificationStatus.NOT_VERIFIED && pan_id && TryAgain !== 'pan' ? (
          <div className="d-flex align-items-center">
            <div className="heading-text">{PanView(pan_id)}</div>
            <img className="verification-status-img" src={statusImage[pan_status]} alt="" />
            <p className="p-0 m-0 ms-1">{statusMessage[pan_status]}</p>
            {pan_status === VerificationStatus.FAILED && (
              <button
                className="button-box book-button-color border-0 p-1 ms-2 normal-text"
                id="pan"
                onClick={(e) => {
                  handleTryAgain(e);
                }}
              >
                Try again
              </button>
            )}
          </div>
        ) : aadhar_status === VerificationStatus.VERIFIED || TryAgain === 'pan' ? (
          <div className="d-md-flex">
            <div>
              <InputMask
                className="mb-3 me-3 p-1 heading-text"
                mask="aaaaa 9999 a"
                placeholder="Enter pan number"
                maskChar=" "
                pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                onChange={(e) => {
                  setPan(e.target.value.toUpperCase().replaceAll(' ', ''));
                }}
              />
            </div>
            <div>
              <button className="button-box book-button-color border-0 heading-text" disabled={!PAN_REGEX.test(pan)} onClick={handlePanVerify}>
                Verify
              </button>
              {ErrorMessage.panError && <p className="p-o m-0 my-2 text-danger">{ErrorMessage.panError}</p>}
            </div>
          </div>
        ) : aadhar_status !== VerificationStatus.VERIFIED ? (
          <div className="d-md-flex">
            <div>
              <InputMask
                disabled
                className="mb-3 me-3 p-1 heading-text"
                mask="aaaaa 9999 a"
                placeholder="Enter pan number"
                maskChar=" "
                pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                onChange={(e) => {
                  setPan(e.target.value.toUpperCase().replaceAll(' ', ''));
                }}
              />
              <div className="small-text lighter-text mb-2">(Please verify aadhar first)</div>
            </div>
            <div>
              <button className="button-box book-button-color border-0 heading-text" disabled={!PAN_REGEX.test(pan)} onClick={handlePanVerify}>
                Verify
              </button>
            </div>
          </div>
        ) : null}
        {/* {pan_id ? (
                <div className="d-flex align-items-center">
                  <div className="heading-text">{PanView(pan_id)}</div>
                  <img className="verification-status-img" src={statusImage[pan_status]} alt="" />
                  <p className="p-0 m-0 ms-1">{statusMessage[pan_status]}</p>
                </div>
              ) : (
                <div className="d-md-flex">
                  <div>
                    {aadhar_status !== 'verified' ? (
                      <div>
                        <InputMask
                          disabled
                          className="mb-3 me-3 p-1 heading-text"
                          mask="aaaaa 9999 a"
                          placeholder="Enter pan number"
                          maskChar=" "
                          pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                          onChange={(e) => {
                            setPan(e.target.value.toUpperCase().replaceAll(' ', ''));
                          }}
                        />
                        <div className="small-text lighter-text">(Please verify aadhar first)</div>
                      </div>
                    ) : (
                      <InputMask
                        className="mb-3 me-3 p-1 heading-text"
                        mask="aaaaa 9999 a"
                        placeholder="Enter pan number"
                        maskChar=" "
                        pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                        onChange={(e) => {
                          setPan(e.target.value.toUpperCase().replaceAll(' ', ''));
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <button className="button-box book-button-color border-0 heading-text" disabled={!PAN_REGEX.test(pan)} onClick={handlePanVerify}>
                      Verify
                    </button>
                  </div>
                </div>
              )} */}
      </div>
    );
  };
  const renderDrivingLicense = () => {
    return (
      <div>
        <h3 className="profile-right-heading ps-0">Driving License</h3>
        {driving_license_status !== VerificationStatus.NOT_VERIFIED && driving_license_id && TryAgain !== 'driving_license' ? (
          <div className="d-flex align-items-center">
            <div className="heading-text">{DrivingLicenseView(driving_license_id)}</div>
            <img className="verification-status-img" src={statusImage[driving_license_status]} alt="" />
            <p className="p-0 m-0 ms-1">{statusMessage[driving_license_status]}</p>
            {driving_license_status === VerificationStatus.FAILED && (
              <button
                className="button-box book-button-color border-0 p-1 ms-2 normal-text"
                id="driving_license"
                onClick={(e) => {
                  handleTryAgain(e);
                }}
              >
                Try again
              </button>
            )}
          </div>
        ) : aadhar_status === VerificationStatus.VERIFIED || TryAgain === 'driving_license' ? (
          <div className="d-md-flex">
            <div>
              <InputMask
                className="mb-3 me-3 p-1 heading-text"
                mask="aa 99999999999999"
                placeholder="Enter driving license number"
                maskChar=" "
                pattern="\d{2} \d{14}"
                onChange={(e) => {
                  setDrivingLicense(e.target.value.toUpperCase().replaceAll(' ', ''));
                }}
              />
            </div>
            <div>
              <button
                className="button-box book-button-color border-0 heading-text"
                disabled={!DRIVING_REGEX13.test(drivingLicense) && !DRIVING_REGEX14.test(drivingLicense)}
                onClick={handleDrivingLicenseVerify}
              >
                Verify
              </button>
              {ErrorMessage.drivingLicenseError && <p className="p-o m-0 my-2 text-danger">{ErrorMessage.drivingLicenseError}</p>}
            </div>
          </div>
        ) : aadhar_status !== VerificationStatus.VERIFIED ? (
          <div className="d-md-flex">
            <div>
              <InputMask
                disabled
                className="mb-3 me-3 p-1 heading-text"
                mask="aa 99999999999999"
                placeholder="Enter driving license number"
                maskChar=" "
                pattern="\d{2} \d{14}"
                onChange={(e) => {
                  setDrivingLicense(e.target.value.toUpperCase().replaceAll(' ', ''));
                }}
              />
              <div className="small-text lighter-text mb-2">(Please verify aadhar first)</div>
            </div>
            <div>
              <button
                className="button-box book-button-color border-0 heading-text"
                disabled={!DRIVING_REGEX13.test(drivingLicense) && !DRIVING_REGEX14.test(drivingLicense)}
                onClick={handleDrivingLicenseVerify}
              >
                Verify
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  };
  return (
    <>
      <div className="col-lg-10 col-md-12 col-sm-12">
        <div className="profile-right-card" style={{ padding: '1rem 2rem' }}>
          <div className="d-flex border-bottom" style={{ paddingBottom: '1.3rem' }}>
            {renderAadhar()}
          </div>
          <div className="d-flex border-bottom" style={{ paddingBottom: '1.3rem' }}>
            {renderPan()}
          </div>
          <div className="d-flex border-bottom" style={{ paddingBottom: '1.3rem' }}>
            {renderDrivingLicense()}
          </div>
        </div>
      </div>
    </>
  );
};

export default KYC;
