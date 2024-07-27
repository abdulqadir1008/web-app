import { Backdrop, Box, CircularProgress, dividerClasses, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React, { forwardRef, useEffect, useState } from 'react';
import AccordionButton from '../../assets/AccordionButton.png';
import AccordionButtonUp from '../../assets/AccordionButtonUp.png';
import TataN1 from '../../assets/TataN1.jpg';
import HeadersLogo from '../../assets/HeadersLogo.png';
import Rect from '../../assets/Rectangle2.png';
import DownloadInvoice from '../../assets/DownloadInvoice.png';
import { resolvePostApiWithHeaders } from '../../Common/ResolveApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getCookie } from '../../components/Cookies';
import { CustomerDetailsQuery, GetCustomerBookingDetails } from '../../graphqlQueries/CustomerDetailsQuery';
import { DateTimeFormatter, DateTimeView } from '../../Common/DateTimeFormatter';
import { Link, useNavigate } from 'react-router-dom';
import { DirectionModule } from '../../components/DirectionModule';
import BookingUpdate from '../BookingUpdate/BookingUpdate';
import './Account.css';

const enum BookingStatus {
  PENDING = 'booking_pending',
  SUCCESS = 'booked',
  CANCEL = 'cancelled'
}
const enum PaymentStatus {
  PENDING = 'in_progress',
  SUCCESS = 'success',
  CANCEL = 'failed'
}
const MyBookings = () => {
  const [Checked, setChecked] = useState(true);
  const [buttonValue, setButtonValue] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [bookingUpdateSelectedId, setBookingUpdateSelectedId] = useState(null);
  const [kycStatus, setKycStatus] = useState();
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();
  const token = getCookie('Customer_access_token');
  const handleClick = (e: any) => {
    if (buttonValue == false) {
      setButtonValue(true);
      setChecked(false);
    } else {
      setButtonValue(false);
      setChecked(true);
    }
  };
  const getMyBookings = async () => {
    try {
      setLoader(true);
      const { getCustomerBookingDetails } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, GetCustomerBookingDetails(), token);
      setBookingData(getCustomerBookingDetails);
      setLoader(false);
    } catch (e: any) {
      console.log(e);
    }
  };
  const CustomerDetailsData = async () => {
    try {
      const { getCustomerDetails } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, CustomerDetailsQuery(), token);
      setKycStatus(getCustomerDetails.kyc_status);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleUpdateBooking = (e: any) => {
    const { value } = e.target;
    if (value === 'close') {
      setBookingUpdateSelectedId(null);
    } else {
      setBookingUpdateSelectedId(value);
    }
  };
  useEffect(() => {
    getMyBookings();
    CustomerDetailsData();
  }, []);

  const value = 4;
  const renderCancel = () => {
    return (
      <>
        <button type="button" className="book-button-color button-box normal-text border-0 p-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
          Cancel
        </button>

        <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-2} aria-labelledby="staticBackdropLabel" aria-hidden="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title " id="staticBackdropLabel">
                  Cancel Booking
                </h3>
                <button type="button" className="btn-close normal-text bg-transparent" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer p-1">
                <button type="button" className="btn  normal-text bg-danger p-1 px-2 text-light" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn  normal-text bg-primary p-1 px-2 text-light">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const renderUpdateBookingButton = (customer_booking_id: string) => {
    return (
      <>
        <button
          type="button"
          className="book-button-color button-box normal-text border-0 p-1"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop1"
          value={customer_booking_id}
          onClick={(e: any) => {
            handleUpdateBooking(e);
          }}
        >
          Update
        </button>
        <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-2} aria-labelledby="staticBackdropLabel" aria-hidden="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title " id="staticBackdropLabel">
                  Update Booking
                </h3>
                <button
                  type="button"
                  className="btn-close normal-text bg-transparent"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  value="close"
                  onClick={(e: any) => {
                    handleUpdateBooking(e);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {bookingUpdateSelectedId && <BookingUpdate custId={bookingUpdateSelectedId} />}
                {/* <BookingUpdate custId={customer_booking_id}/> */}
              </div>
              <div className="modal-footer p-1">
                <button
                  value="close"
                  type="button"
                  className="btn  normal-text bg-danger p-1 px-2 text-light"
                  data-bs-dismiss="modal"
                  onClick={(e: any) => {
                    handleUpdateBooking(e);
                  }}
                >
                  Close
                </button>
                <button type="button" className="btn  normal-text bg-primary p-1 px-2 text-light">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const renderButtons = (lats: string, longs: string, customer_booking_id: string) => {
    return (
      <div className="d-flex  align-items-center">
        {/* <div className="mx-1">{renderUpdateBookingButton(customer_booking_id)}</div> */}
        {/* <div className="mx-1">{renderCancel()}</div> */}
        <div className="mx-1">
          {kycStatus ? (
            lats !== null ? (
              <div className=" button-box book-button-color p-1 d-inline-flex normal-text">{DirectionModule(lats, longs)}</div>
            ) : (
              <div className="d-flex justify-content-end" style={{ width: '100%', marginRight: '0' }}>
                <p className="normal-text mt-1 d-flex justify-content-center m-0">(Car location will be shared 2 hours prior to booking starting time)</p>
              </div>
            )
          ) : (
            <>
              <Link className=" mx-3 text-decoration-none text-white normal-text" to="/Profile">
                <button className="border border-1 border-danger text-danger normal-text blinking-text bg-light p-1 rounded-2">KYC verification pending</button>
              </Link>
              <p className="small-text mt-1 d-flex justify-content-center ">(Complete kyc to get direction of car)</p>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {loader ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className="container-fluid p-0 m-0">
          {/* <div className="d-flex justify-content-end order-1">
        <div className="d-md-block d-flex">
          <h3 className="red-text m-0 p-0">Total Outstanding Balance &nbsp;</h3>
          <h3 className="d-flex justify-content-center fw-bold red-text m-0 p-0">₹100/-</h3>
        </div>
      </div> */}
          {bookingData ? (
            bookingData.map((items: any) => {
              const {
                booking_id,
                car_id,
                start_date,
                end_date,
                actual_end_date,
                actual_start_date,
                booking_date,
                booking_amount,
                customer_booking_id,
                pick_up_fuel,
                drop_off_fuel,
                extra_fuel_charges,
                government_challans,
                car_damage_charges,
                trip_extension_charges,
                discount,
                images,
                booking_status,
                payment_status,
                lats,
                longs
              } = items;

              return (
                <div key={customer_booking_id} className="main-card d-width-80 ms-4 " style={{ borderRadius: '1rem' }}>
                  <div className="d-flex justify-content-between">
                    <div className="mobile-changes">
                      <div className="d-flex align-items-center">
                        <h3 className="m-0 p-0">Booking Id: </h3>&nbsp;
                        <p className="m-0 p-0">{customer_booking_id}</p> &nbsp;
                        {/* <button className="small-text  desktop-view button-box border-0">
                           Download Invoice <img src={DownloadInvoice} alt="" />
                              </button> */}
                        {/* <h3 className="mobile-view m-0 p-0 green-text fw-bold">Live</h3> */}
                      </div>
                      <div className="d-flex align-items-center">
                        <h3 className="m-0 p-0">Start Date: </h3>&nbsp;
                        <p className="m-0 p-0">{DateTimeView(start_date)}</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <h3 className="m-0 p-0">End Date: </h3>&nbsp;
                        <p className="m-0 p-0">{DateTimeView(end_date)}</p>
                      </div>
                      <div className="d-flex flex-column align-items-start mt-1">
                        <h3 className="d-flex m-0">
                          Booking status:
                          {booking_status === BookingStatus.SUCCESS ? (
                            <h3 className="text-success"> &nbsp;Success</h3>
                          ) : booking_status === BookingStatus.PENDING ? (
                            <h3 className="text-warning"> &nbsp;Pending</h3>
                          ) : (
                            <h3 className="text-danger"> &nbsp;Failed</h3>
                          )}
                        </h3>
                        <h3 className="d-flex m-0">
                          Payment status:
                          {payment_status === PaymentStatus.SUCCESS ? (
                            <h3 className="text-success"> &nbsp;Success</h3>
                          ) : payment_status === PaymentStatus.PENDING ? (
                            <h3 className="text-warning"> &nbsp;In progress</h3>
                          ) : payment_status === PaymentStatus.CANCEL ? (
                            <h3 className="text-danger"> &nbsp;Failed</h3>
                          ) : null}
                        </h3>
                      </div>
                      {/* <button className="small-text  mobile-view  button-box border-0">Download Invoice</button> */}
                    </div>
                    <div>
                      <div className="d-md-flex">
                        <div className="d-flex justify-content-end">
                          <img src={images ? images[0] : Rect} className="car-img" alt="" />
                        </div>
                        <div className="d-flex justify-content-end">
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Rating
                              size="small"
                              name="text-feedback"
                              value={value}
                              readOnly
                              precision={0.5}
                              style={{ maxWidth: '0.6rem !important' }}
                              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {/* <Box sx={{ ml: 0.2 }}>{labels[value]}</Box> */}
                          </Box>
                        </div>
                        <div className="mobile-view d-flex justify-content-center">
                          <div className="d-flex justify-content-center align-items-end mt-1">{renderButtons(lats, longs, customer_booking_id)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="desktop-view" style={{ width: '33%' }}>
                      {/* <h3 className="green-text d-flex justify-content-center fw-bold">Live</h3> */}
                      <div className="d-flex flex-column align-items-center">
                        <h3 className="fw-semibold">Booking Amount</h3>
                        <h3 className="d-flex justify-content-center fw-semibold">₹{booking_amount}/-</h3>
                        <div className="mt-2">{renderButtons(lats, longs, customer_booking_id)}</div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="accordion-item">
              <div className="accordion-header d-flex justify-content-center" id="headingOne">
                <div>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseOne${booking_id}`}
                    aria-expanded="true"
                    aria-controls={`collapseOne${booking_id}`}
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    {buttonValue == false ? <img src={AccordionButton} alt="" /> : null}
                  </button>
                </div>
              </div>
              <div id={`collapseOne${booking_id}`} className="accordion-collapse collapse" aria-labelledby={`headingOne${booking_id}`} data-bs-parent={`#accordionExample${booking_id}`}>
                <div className="accordion-body">
                  <div className="d-md-flex">
                    <div className="d-width-30">
                      <div className="empty-div desktop-view"></div>
                      <div className="main-card d-flex justify-content-between  px-4">
                        <div>
                          <p className="m-0 p-0 mb-2">PickUp Fuel</p>
                          <p className="m-0 p-0 mb-1 d-flex justify-content-center">100%</p>
                          <p className="m-0 p-0"> {pick_up_fuel}</p>
                          <img src="" alt="" />
                        </div>
                        <div>
                          <p className="m-0 p-0 mb-2">Drop Fuel</p>
                          <p className="m-0 p-0 mb-1 d-flex justify-content-center">100%</p>
                          <p className="m-0 p-0"> {drop_off_fuel}</p>
                          <img src="" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="d-width-30">
                      <div className="empty-div desktop-view"></div>
                      <div className="main-card ">
                        <div className="d-flex justify-content-between">
                          <p className="m-0 p-0 mb-2">Fuel compensation</p>
                          <p className="m-0 p-0">₹1000</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="m-0 p-0 mb-2">Accessories compensation</p>
                          <p className="m-0 p-0">₹1000</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="m-0 p-0 mb-2">Government challans</p>
                          <p className="m-0 p-0">₹1000</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="m-0 p-0 mb-2">Damage compensation</p>
                          <p className="m-0 p-0">₹1000</p>
                        </div>
                        <div className="border-top d-flex justify-content-between">
                          <p className="m-0 p-0 fw-semibold">Total Extras</p>
                          <p className="m-0 p-0 fw-semibold">₹1000</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-width-30">
                      <div className="empty-div">
                        <h3 className="m-0 p-0 ">Summary</h3>
                      </div>
                      <div className="main-card ">
                        <div className="d-flex justify-content-between">
                          <p className="m-0 p-0 mb-2">Total Trip Amount</p>
                          <p className="m-0 p-0">₹1000</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="m-0 p-0 mb-2">Extras</p>
                          <p className="m-0 p-0">₹1000</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="m-0 p-0 mb-2">Old Outstanding</p>
                          <p className="m-0 p-0">₹1000</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="m-0 p-0 mb-2">Discount</p>
                          <p className="m-0 p-0">₹{discount}</p>
                        </div>
                        <div className="border-top d-flex justify-content-between">
                          <p className="m-0 p-0 fw-semibold">Final Earning</p>
                          <p className="m-0 p-0 fw-semibold">₹1000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" d-flex justify-content-center">
                    <div>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseOne${booking_id}`}
                        aria-expanded="true"
                        aria-controls={`collapseOne${booking_id}`}
                        onClick={(e) => {
                          handleClick(e);
                        }}
                      >
                        {buttonValue == true ? <img src={AccordionButtonUp} alt="" /> : null}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
                </div>
              );
            })
          ) : (
            <div className="d-flex align-items-center justify-content-center orange-text">No Live Booking</div>
          )}
        </div>
      )}
    </>
  );
};

export default MyBookings;
