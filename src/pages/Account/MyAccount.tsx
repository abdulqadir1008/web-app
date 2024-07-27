import { Box, Rating, Select, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DisplayImg from '../../assets/DisplayImg.png';
import StarIcon from '@mui/icons-material/Star';
import { MdCheck, MdClose, MdEdit } from 'react-icons/md';
import { ImCheckmark, ImCross, ImExit } from 'react-icons/im';
import './Account.css';
import { DateTimeView, DateView } from '../../Common/DateTimeFormatter';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getStartingInputData } from '../SignIn/CustomerSignUp';
import { VerificationStatus } from './AccountENUM';

const MyAccount = (props: any) => {
  const value = 4;

  const [Check1, setCheck1] = useState(true);
  const [FullName, setFullName] = useState<string>();
  const [Check2, setCheck2] = useState(true);
  const [DisplayName, setDisplayName] = useState<string>();
  const [Check3, setCheck3] = useState(true);
  const [EmailId, setEmailId] = useState<string>();
  const [Check4, setCheck4] = useState(true);
  const [PhoneNumber, setPhoneNumber] = useState<string>();
  const [Check5, setCheck5] = useState(true);
  const [DateOfBirth, setDateOfBirth] = useState<Date>();
  const [OldPass, setOldPass] = useState('');
  const [NewPass, setNewPass] = useState('');
  const [ReEnterPass, setReEnterPass] = useState('');
  const [PresentAddress, setPresentAddress] = useState('');
  const [PermanentAddress, setPermanentAddress] = useState('');
  const [KycStatus, setKycStatus] = useState<any>({ aadhar_id: '', pan_id: '', driving_license_id: '', aadhar_status: '', pan_status: '', driving_license_status: '' });
  useEffect(() => {
    setKycStatus(props.kycStatus);
  }, [props.kycStatus]);

  useEffect(() => {
    if (props.Details) {
      setFullName(props.Details.full_name);
      setDisplayName(props.Details.display_name);
      setEmailId(props.Details.email_id);
      setPhoneNumber(props.Details.phone_number);
      setDateOfBirth(props.Details.date_of_birth);
    }
  }, [props.Details]);

  const handleClick1 = () => {
    setCheck1(Check1 ? false : true);
  };
  const handleCheck1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };
  const handleClick2 = () => {
    setCheck2(Check2 ? false : true);
  };
  const handleCheck2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };
  const handleClick3 = () => {
    setCheck3(Check3 ? false : true);
  };
  const handleCheck3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };
  const handleClick4 = () => {
    setCheck4(Check4 ? false : true);
  };
  const handleCheck4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleClick5 = () => {
    setCheck5(Check5 ? false : true);
  };
  const handleCheck5 = (date: Date) => {
    setDateOfBirth(date);
  };
  const handleDetailsUpdate = () => {
    props.Update(FullName, DisplayName, EmailId, PhoneNumber, DateOfBirth);
  };

  const handleOldPassword = (e: { target: { value: React.SetStateAction<string> } }) => {
    setOldPass(e.target.value);
  };
  const handleNewPassword = (e: { target: { value: React.SetStateAction<string> } }) => {
    setNewPass(e.target.value);
  };
  const handleReEnterPassword = (e: { target: { value: React.SetStateAction<string> } }) => {
    setReEnterPass(e.target.value);
  };
  const handleAddressCheckbox = (e: any) => {
    if (e.target.checked) {
      setPermanentAddress(PresentAddress);
    } else setPermanentAddress('');
  };
  const handlePasswordUpdate = () => {
    if (NewPass === ReEnterPass && OldPass !== NewPass) {
      props.Password(FullName, DisplayName, OldPass, NewPass);
    } else {
    }
  };

  const [Name1, setName1] = useState('');
  const ImgUploaded1 = useRef<any>({ DisplayImg });
  const ImgUploader1 = useRef<any>(null);
  const handleImg1 = (e: any) => {
    const [file] = e.target.files;
    setName1(file.name);
    if (file) {
      const render = new FileReader();
      ImgUploaded1.current.file = file;
      render.onload = (e) => {
        ImgUploaded1.current.src = e.target?.result;
      };
      render.readAsDataURL(file);
    }
  };
  const { aadhar_id, pan_id, driving_license_id, aadhar_status, pan_status, driving_license_status } = KycStatus;

  return (
    <>
      <div className="col-lg-10 col-12">
        <div className="profile-right-card ">
          <div className="d-md-flex">
            <div className="col-12 col-md-7">
              <div className="d-flex">
                <img ref={ImgUploaded1} src={DisplayImg} className="profile-logo me-0 rounded-circle" alt=""></img>
                <span className="EditButton m-0 p-0 d-flex align-items-end mb-3 me-3" onClick={() => ImgUploader1.current.click()}>
                  <button className="btn m-0 p-0">
                    <MdEdit />
                  </button>
                  <input
                    type="file"
                    onChange={(e) => {
                      handleImg1(e);
                    }}
                    ref={ImgUploader1}
                    accept="image/*"
                    multiple={false}
                    style={{ display: 'none' }}
                    className="btn m-0 p-0"
                  ></input>
                </span>
                <div className="d-flex align-items-center">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Rating name="text-feedback" size="small" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                    <Box sx={{ ml: 0.2 }}></Box>
                  </Box>
                </div>
              </div>
              <div className="card-data d-flex  align-items-center">
                <div className="profile-right-heading heading-text col-lg-3 col-4">
                  Full Name
                  <p className="p-0 m-0 small-text lighter-text">(As per aadhar)</p>
                </div>
                {aadhar_status === VerificationStatus.VERIFIED ? (
                  <div className="normal-text">{FullName}</div>
                ) : (
                  <div className="profile-normal-text">
                    <span className="d-flex align-items-center">
                      {Check1 ? (
                        <p className="m-0 p-0">{FullName}</p>
                      ) : (
                        <>
                          <input
                            type="text"
                            className="inputField inp"
                            onChange={(e) => {
                              handleCheck1(e);
                            }}
                          ></input>
                          <span></span>
                        </>
                      )}
                    </span>
                    <span className="EditButton">
                      <button className="btn m-0 p-0" onClick={handleClick1}>
                        {Check1 ? (
                          <MdEdit />
                        ) : (
                          <>
                            <MdClose /> <br />
                            <ImCheckmark />
                          </>
                        )}
                      </button>
                    </span>
                  </div>
                )}
              </div>
              <div className="card-data d-flex  align-items-center">
                <div className="profile-right-heading heading-text col-lg-3 col-4">
                  Date of Birth
                  <p className="p-0 m-0 small-text lighter-text">(As per aadhar)</p>
                </div>
                {aadhar_status === VerificationStatus.VERIFIED ? (
                  <div className="normal-text">{DateView(DateOfBirth)}</div>
                ) : (
                  <div className="profile-normal-text">
                    <span className="d-flex align-items-center">
                      {Check5 ? (
                        <>
                          {DateOfBirth ? (
                            <p className="m-0 p-0">{DateView(DateOfBirth)}</p>
                          ) : DateOfBirth === undefined ? null : !DateOfBirth ? (
                            <p className="m-0 p-0 text-danger">Please enter Date of birth</p>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <DatePicker
                            className={`datePicker-input  ${props.class1}`}
                            selected={new Date(DateOfBirth!)}
                            onChange={(date) => handleCheck5(date!)}
                            dateFormat="d MMMM, yyyy"
                            maxDate={new Date(getStartingInputData())}
                            showYearDropdown
                          />
                          {/* <input
                      type="text"
                      className="inputField inp"
                      onChange={(e) => {
                        handleCheck5(e);
                      }}
                    ></input> */}
                          <span></span>
                        </>
                      )}
                    </span>
                    <span className="EditButton">
                      <button className="btn m-0 p-0" onClick={handleClick5}>
                        {Check5 ? (
                          <MdEdit />
                        ) : (
                          <>
                            <MdClose /> <br />
                            <ImCheckmark />
                          </>
                        )}
                      </button>
                    </span>
                  </div>
                )}
              </div>
              <div className="card-data d-flex  align-items-center">
                <div className="profile-right-heading heading-text col-lg-3 col-4">Display Name</div>
                <div className="profile-normal-text">
                  <span className="d-flex align-items-center">
                    {Check2 ? (
                      <p className="m-0 p-0">{DisplayName}</p>
                    ) : (
                      <input
                        type="text"
                        className="inputField  inp"
                        onChange={(e) => {
                          handleCheck2(e);
                        }}
                      ></input>
                    )}
                  </span>
                  <span className="EditButton">
                    <button className="btn m-0 p-0" onClick={handleClick2}>
                      {Check2 ? <MdEdit /> : <ImCheckmark />}
                    </button>
                  </span>
                </div>
              </div>
              <div className="card-data d-flex  align-items-center">
                <div className="profile-right-heading heading-text  col-lg-3 col-4">Email Id</div>
                <div className="profile-normal-text">
                  <span className="d-flex align-items-center">
                    {Check3 ? (
                      <p className="m-0 p-0">{EmailId}</p>
                    ) : (
                      <input
                        type="email"
                        className="inp inputField"
                        onChange={(e) => {
                          handleCheck3(e);
                        }}
                      ></input>
                    )}
                  </span>
                  <span className="EditButton">
                    <button className="btn m-0 p-0" onClick={handleClick3}>
                      {Check3 ? <MdEdit /> : <ImCheckmark />}
                    </button>
                  </span>
                </div>
              </div>
              <div className="card-data d-flex  align-items-center">
                <div className="profile-right-heading heading-text col-lg-3 col-4">Mobile No.</div>
                <div className="profile-normal-text">
                  <span className="d-flex align-items-center">
                    {Check4 ? (
                      <p className="m-0 p-0">{PhoneNumber}</p>
                    ) : (
                      <input
                        type="number"
                        className="inp inputField"
                        maxLength={10}
                        onChange={(e) => {
                          handleCheck4(e);
                        }}
                      ></input>
                    )}
                  </span>
                  <span className="EditButton">
                    <button className="btn m-0 p-0" onClick={handleClick4}>
                      {Check4 ? <MdEdit /> : <ImCheckmark />}
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex d-md-block flex-wrap mt-3">
              <div className="ms-3 m-md-0">
                <h3>Present Address:</h3>
                <textarea
                  value={PresentAddress}
                  className="p-1 normal-text"
                  name="Present Address"
                  id="Present Address"
                  placeholder="Enter present address"
                  cols={20}
                  rows={3}
                  onChange={(e) => setPresentAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="ms-3 m-md-0">
                <h3 className="m-0 p-0">Permanent Address:</h3>
                <div className="d-flex align-items-center normal-text lighter-text my-1 mb-2">
                  Check this box if same as present address&nbsp;{' '}
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    onClick={(e) => {
                      handleAddressCheckbox(e);
                    }}
                  />{' '}
                </div>
                <textarea value={PermanentAddress} className="p-1 normal-text" name="Permanent Address" id="Permanent Address" placeholder="Enter permanent address" cols={20} rows={3}></textarea>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-end justify-content-end">
            <button className="button-box book-button-color border-0 heading-text" onClick={handleDetailsUpdate}>
              Update
            </button>
          </div>
        </div>
        <div className="profile-right-card d-flex  justify-content-between ">
          <div className="d-flex ">
            <div className="pass-right-heading heading-text"> Password</div>
            <div className="d-flex flex-column justify-content-start">
              <div>
                <input
                  className="border-0 border-bottom heading-text my-2"
                  id="standard-password-input1"
                  placeholder="Old Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleOldPassword}
                />
              </div>
              <div>
                <input
                  className="border-0 border-bottom heading-text my-2"
                  id="standard-password-input2"
                  placeholder="New Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleNewPassword}
                />
              </div>
              <div>
                <input
                  className="border-0 border-bottom heading-text my-2"
                  id="standard-password-input3"
                  placeholder="Re-enter Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleReEnterPassword}
                />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-end">
            <button className="button-box book-button-color border-0 heading-text" onClick={handlePasswordUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
