import { Box } from '@mui/system';
import React, { Component } from 'react';

import { resolvePostApi, resolvePostApiWithHeaders } from '../../Common/ResolveApi';
import { getCarDetailsQuery } from '../../graphqlQueries/CarDetailsQuery';
import { CustomerDetailsQuery, GetAllListings, referralCouponQuery } from '../../graphqlQueries/CustomerDetailsQuery';
import StarIcon from '@mui/icons-material/Star';
import { I_CarDetail_Car_Data, I_Coupon_List } from '../../types/Interfaces';
import SuccessTick from '../../assets/successTick.png';
import Agreement from '../../assets/Agreement.pdf';
import { getCookie, setCookie } from '../../components/Cookies';
import { GetCouponQuery, PayuQuery, ValidateCoupon } from '../../graphqlQueries/PaymentQuery';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { Backdrop, buttonBaseClasses, Checkbox, CircularProgress, Rating } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import '../../components/carousel.css';
import Rect from '../../assets/Rectangle2.png';
import { DateTimeFormatter, DateTimeView } from '../../Common/DateTimeFormatter';
import withNavigateHook from '../Navigate';
import '../HomePage/HomePage.css';
import { setTotalPriceAmout } from '../../redux/actionTypes/billingPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TOTAL_AMOUNT } from '../../redux/actionTypes/actionTypes';
import { CalculateTripDuration } from '../../Common/TimeDuration';
import Failure from '../../assets/Failure.png';
import { eightHr, oneHr } from '../../Common/Constants';
import './Coupon.css';

enum ApplyPromoCode_Enum {
  VALID = 'valid',
  INVALID = 'invalid',
  DEFAULT = ''
}
interface Props {
  location?: any;
}

interface IState {
  carData: I_CarDetail_Car_Data;
  car_id: string;
  starts: Date;
  ends: Date;
  address: string;
  Duration: string;
  checkBox: boolean;
  referralDiscountAmount: number;
  promoCode: string;
  applyPromoCode: ApplyPromoCode_Enum;
  discountAmount: number;
  token: string | null;
  protectionPlanAmount: number;
  couponStatus: string;
  couponButton: boolean;
  protectionPlanType: string;
  bookingAmount: number;
  loader: boolean;
  couponList: I_Coupon_List;
}
interface Props {
  navigate: (pathname: string, search: string) => void;
}
class BillingPage extends Component<Props> {
  searchParams = new URLSearchParams(window.location.search);
  state: IState = {
    carData: {},
    car_id: this.searchParams.get('car_id')!,
    starts: new Date(parseInt(this.searchParams.get('starts')!.replace('GMT ', 'GMT+')!, 10))!,
    ends: new Date(parseInt(this.searchParams.get('ends')!.replace('GMT ', 'GMT+')!, 10))!,
    address: this.searchParams.get('address')!,
    Duration: '',
    checkBox: false,
    referralDiscountAmount: 0,
    promoCode: '',
    applyPromoCode: ApplyPromoCode_Enum.DEFAULT,
    discountAmount: 0,
    token: getCookie('Customer_access_token'),
    protectionPlanAmount: 0,
    couponStatus: '',
    couponButton: false,
    protectionPlanType: 'BASIC',
    bookingAmount: 0,
    loader: true,
    couponList: {}
  };
  constructor(props: any) {
    super(props);
  }
  getCarDetailsData = async (car_id: string, starts: any, ends: any) => {
    try {
      this.setState({ loader: true });
      const { getCarDetails } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, getCarDetailsQuery(car_id, starts, ends));
      const { getAllListings } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, GetAllListings(car_id));
      const finalBookingAmount = parseInt(getCarDetails.base_price!) - this.state.discountAmount - this.state.referralDiscountAmount;
      const finalAmnt = parseInt(getCarDetails.base_price!) + parseInt(getCarDetails.base_insurance) - this.state.discountAmount - this.state.referralDiscountAmount;
      const props: any = this.props;
      props.setTotalPriceAmout(finalAmnt);
      this.setState({ carData: getCarDetails, protectionPlanAmount: getCarDetails.base_insurance, bookingAmount: finalBookingAmount, loader: false });
    } catch (error) {
      console.error(error);
    }
  };

  // dateString = (starts: any, ends: any) => {
  //   const dateOptions: any = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  //   this.setState({ starts: new Date(starts).toLocaleString('en-US', dateOptions), ends: new Date(ends).toLocaleString('en-US', dateOptions) });
  // };

  handleCalculateDuration = (starts: any, ends: any) => {
    const startDate = new Date(starts);
    const endDate = new Date(ends);
    const durationInMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(durationInMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMs / (1000 * 60)) % 60);
    const timeDuration = `${hours} hours ${minutes > 0 ? `${minutes} minutes` : ''}`;
    this.setState({ Duration: timeDuration });
  };
  handleCouponButton = () => {
    if (!this.state.couponButton) {
      this.setState({ couponButton: true });
    } else {
      this.setState({ couponButton: false });
    }
  };
  handleReferralCouponCheck = async (amount: number) => {
    const { referralDiscount } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, referralCouponQuery(amount), this.state.token);
    const finalBookingAmount = this.state.carData.base_price! - this.state.discountAmount - parseInt(referralDiscount.referral_discount_amount);
    const finalAmnt = this.state.carData.base_price! + this.state.protectionPlanAmount - this.state.discountAmount - parseInt(referralDiscount.referral_discount_amount);
    const props: any = this.props;
    props.setTotalPriceAmout(finalAmnt);
    this.setState({ referralDiscountAmount: referralDiscount.referral_discount_amount, bookingAmount: finalBookingAmount });
  };
  handlePromoCode = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ promoCode: value.toUpperCase() });
  };
  handleClearPromoCode = () => {
    this.setState({ promoCode: '' });
    this.handleApply(this.state.promoCode);
  };
  handleApply = async (code: string) => {
    await this.setState({ couponStatus: '', loader: true });
    try {
      if (this.state.referralDiscountAmount) {
        var { validateCouponCode } = await resolvePostApiWithHeaders(
          import.meta.env.VITE_BACKEND_BASE_URL,
          ValidateCoupon(code, this.state.carData.base_price! - this.state.referralDiscountAmount),
          this.state.token
        );
        console.log(validateCouponCode)
      } else {
        var { validateCouponCode } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, ValidateCoupon(code, this.state.carData.base_price!), this.state.token);
         console.log(validateCouponCode);
      }
      const finalBookingAmount = this.state.carData.base_price! - parseInt(validateCouponCode.discount_amount) - this.state.referralDiscountAmount;
      const finalAmnt = this.state.carData.base_price! + this.state.protectionPlanAmount - parseInt(validateCouponCode.discount_amount) - this.state.referralDiscountAmount;
      const props: any = this.props;
      props.setTotalPriceAmout(finalAmnt);
      if (code === '') {
        this.setState({ discountAmount: validateCouponCode.discount_amount, couponStatus: '', bookingAmount: finalBookingAmount, loader: false });
      } else {
        this.setState({ discountAmount: validateCouponCode.discount_amount, couponStatus: validateCouponCode.coupon_status, bookingAmount: finalBookingAmount, loader: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  getCouponList = async () => {
    var { getCoupons } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, GetCouponQuery(), this.state.token);
    this.setState({ couponList: getCoupons });
  };

  handleCheckBox = () => {
    const props: any = this.props;
    const searchparams = `?lat=${this.searchParams.get('lat')!}&lng=${this.searchParams.get('lng')!}&address=${this.searchParams.get(
      'address'
    )!}&starts=${this.state.starts.getTime()}&ends=${this.state.ends.getTime()}`;
    if (this.state.starts.getTime()! < new Date().getTime() + oneHr) {
      alert('Please change the trip start time as it should be one hour ahead of current time.');
      props.navigate({
        pathname: '/allCars2',
        search: searchparams
      });
    } else if (this.state.ends.getTime() - this.state.starts.getTime() < eightHr) {
      alert('Minimum booking time should be eight hours.');
      props.navigate({
        pathname: '/allCars2',
        search: searchparams
      });
    } else {
      if (!this.state.checkBox) {
        this.setState({ checkBox: true });
      } else this.setState({ checkBox: false });
    }
  };

  handleOptionChange = (event: any) => {
    const { id, value } = event.target;
    const finalAmnt = this.state.carData.base_price! + parseInt(value) - this.state.discountAmount - this.state.referralDiscountAmount;
    const props: any = this.props;
    props.setTotalPriceAmout(finalAmnt);
    this.setState({
      protectionPlanAmount: parseInt(value),
      protectionPlanType: id
    });
  };
  handleFavorite = (car_id: any, e: any) => {};
  handleProceed = () => {
    const { car_id, address, starts, ends, bookingAmount, protectionPlanAmount, protectionPlanType, token } = this.state;
    const props: any = this.props;
    props.navigate({
      pathname: '/PaymentFormPage',
      search: `?car_id=${car_id}&address=${address}&starts=${starts}&ends=${ends}&amount=${bookingAmount}&plan_amount=${protectionPlanAmount}&plan_type=${protectionPlanType}&token=${token}`
    });
  };
  componentDidMount() {
    const { car_id, starts, ends } = this.state;
    this.getCouponList();
    this.getCarDetailsData(car_id, starts, ends);
    // this.dateString(starts, ends);
    this.handleCalculateDuration(starts, ends);
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: any, snapshot?: any): void {
    if (this.state.carData !== prevState.carData) {
      this.handleReferralCouponCheck(this.state.carData.base_price!);
    }
  }
  label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  renderCarDetailsCard = () => {
    const { carData, car_id, starts, ends, address, Duration } = this.state;
    const { company_name, model, transmission_type, fuel_type, year_of_manufacturing, images, seating_capacity } = carData;
    const value = 4;

    return (
      <div className="large-screen-flex">
        <div className="billingPage-left-section">
          <div className="d-flex  justify-content-between margin-space">
            <p className="p-0 m-0 me-2 lighter-text border-bottom flex-grow-1">
              {transmission_type} - {fuel_type} - {seating_capacity} seater{' '}
            </p>
            <div className="d-flex justify-content-end ">
              <div className="small-text km-button heavy-text">5kms away</div>
              <Checkbox
                sx={{
                  padding: '0 0 0 0.5rem'
                }}
                size="small"
                {...this.label}
                icon={<FavoriteBorder sx={{ width: '0.75rem' }} />}
                checkedIcon={<Favorite sx={{ width: '0.75rem' }} />}
                name="car_id"
                onChange={(e) => {
                  this.handleFavorite(car_id!, e);
                }}
              />
            </div>
          </div>
          <div className="d-flex ">
            <p className="m-0 heavy-text">
              {company_name} {model}
            </p>
            <p className="p-0 m-0 ms-2 lighter-text small-text d-flex align-items-end">{year_of_manufacturing} - 20K driven</p>
          </div>
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
          <div className="carousel-section">
            {images && images.length ? (
              <Carousel className="margin-space mx-auto carousel-box" showArrows={true}>
                {images.map((eachImage: any, index: any) => {
                  return (
                    <div key={index} className="carousel-car-image-box">
                      <img className="car-image" src={eachImage} />
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <Carousel className="margin-space mx-auto carousel-box" showArrows={true}>
                <div className="h">
                  <img className="car-image" src={Rect} />
                </div>
                <div className="h">
                  <img className="car-image" src={Rect} />
                </div>
                <div className="h">
                  <img className="car-image" src={Rect} />
                </div>
              </Carousel>
            ) }
          </div>
        </div>
        <div className="main-card billingPage-right-section">
          <div className="border-bottom heading-text heading-fw pb-1 mb-1">Trip Details:</div>
          <div className="d-flex border-bottom ">
            <p className="my-1 fw-semibold">Start:</p>
            <p className="my-1 ps-1">{DateTimeView(DateTimeFormatter(starts))}</p>
          </div>
          <div className="d-flex border-bottom ">
            <p className="my-1 fw-semibold">End:</p>
            <p className="my-1 ps-1">{DateTimeView(DateTimeFormatter(ends))}</p>
          </div>
          <div className="d-flex border-bottom ">
            <p className="my-1 fw-semibold">Duration:</p>
            <p className="my-1 ps-1">{CalculateTripDuration(ends, starts)}</p>
          </div>
          <div className="d-flex border-bottom ">
            <p className="my-1 fw-semibold">Location:</p>
            <p className="my-1 ps-1" style={{ overflow: 'scroll' }}>
              {address}{' '}
            </p>
          </div>
          <div className="d-flex border-bottom ">
            <p className="my-1 fw-semibold">Direction:</p>
            <p className="my-1 ps-1">(Car direction will be provided in my booking page)</p>
          </div>
        </div>
      </div>
    );
  };
  renderTerms = () => {
    return (
      <div className="main-card">
        <div className="d-flex justify-content-center m-2 mb-4">
          <div className="heading-text heading-fw mb-2">Important Points to Remember</div>
        </div>
        <div className=" row px-3">
          <div className="col-3">
            <p>ID VERIFICATION:</p>
          </div>
          <div className="col-9">
            <p>Required documents are AADHAR,PAN, DRIVING LICENCE.</p>
          </div>
        </div>
        <div className=" row px-3">
          <div className="col-3">
            <p>CANCELLATION CHARGES:</p>
          </div>
          <div className="col-9">
            <p>
              Cancel the trip before 8 hours will charge 500. <br /> Cancel the trip before 5 hours will charge 50% of your booking amount. <br />
              Cancel the trip after 3 hours will charge 100% of your booking amount.
            </p>
          </div>
        </div>
        <div className=" row px-3">
          <div className="col-3">
            <p>INSPECTION:</p>
          </div>
          <div className="col-9">
            <p>If key not returned at the end of the trip 1000 plus replacement charges will be applicable within 2days.</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end heading-text mt-2">
          <div>
            <a href={Agreement} target="_blank">
              Terms and condition
            </a>
          </div>
        </div>
      </div>
    );
  };
  renderInsurancePlan = () => {
    const { carData } = this.state;
    const { base_insurance, total_protection_insurance } = carData;
    return (
      <div className="main-card">
        <div className="heading-text heading-fw mb-2">Protection Plan</div>
        <div>
          <label htmlFor="" className="normal-text fw-semibold ">
            <input type="radio" value={base_insurance} defaultChecked name="protectionPlanAmount" id="BASIC" onChange={this.handleOptionChange} />
            &nbsp;&nbsp;&nbsp;&nbsp;Base Plan - &nbsp;&nbsp;₹{base_insurance}
            <br />
            <span className="lighter-text fw-normal">(You pay upto ₹20,000/- in case of any damage)</span>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal-text fw-semibold">
            <input type="radio" value={total_protection_insurance} name="protectionPlanAmount" id="PREMIUM" onChange={this.handleOptionChange} />
            &nbsp;&nbsp;&nbsp;&nbsp;Advanced Plan - &nbsp;&nbsp;₹{total_protection_insurance}
            <br />
            <span className="lighter-text fw-normal">(You pay upto ₹10,000/- in case of any damage)</span>
          </label>
        </div>

        <div>
          <div className="heading-text heading-fw mb-2 mt-2">What is Protection Plan?</div>
          <ul className="normal-text bg-secondary bg-opacity-25 m-0 p-1 ps-3">
            <li>Infila will assist in damage repair costs up to the amount as per the maximum deductible limit.</li>
            <li>Does not cover any third-party liability or any intentional damage or damage that occurred due to intoxication or high speed, rash, or negligent driving.</li>
            <li> Please read Infila policy to know more.</li>
          </ul>
        </div>
      </div>
    );
  };
  renderBill = () => {
    const { carData, referralDiscountAmount, discountAmount, protectionPlanAmount, couponButton, checkBox, couponStatus, promoCode } = this.state;
    const { base_price } = carData;
    const props: any = this.props;
    const { totalAmount } = props;
    /*****PROMOCODE MESSAGE*/
    let PromoCode_Message;
    switch (couponStatus) {
      case 'VALID':
        PromoCode_Message = (
          <p style={{ color: 'blue' }}>
            Promo code <span className="fw-bold "> {promoCode}</span> applied <img src={SuccessTick} alt="" style={{ width: '1rem', height: '1rem' }} />
          </p>
        );
        break;
      case 'INVALID':
        PromoCode_Message = (
          <p style={{ color: 'red' }}>
            Promo code <span className="fw-bold "> {promoCode}</span> not valid <img src={Failure} alt="" style={{ width: '1rem', height: '1rem',marginLeft:'0.3rem' }} />
          </p>
        );
        break;
      case 'EXPIRED':
        PromoCode_Message = (
          <p style={{ color: 'red' }}>
            Promo code <span className="fw-bold "> {promoCode}</span> expired
            <img src={Failure} alt="" style={{ width: '1rem', height: '1rem', marginLeft: '0.3rem' }} />
          </p>
        );
        break;
      case 'USED':
        PromoCode_Message = (
          <p style={{ color: 'red' }}>
            Promo code <span className="fw-bold "> {promoCode}</span> already used
            <img src={Failure} alt="" style={{ width: '1rem', height: '1rem', marginLeft: '0.3rem' }} />
          </p>
        );
        break;
      case '':
        PromoCode_Message = '';
        break;
      default:
        PromoCode_Message = '';
        break;
    }
    return (
      <div className="main-card">
        <div className="heading-text heading-fw mb-3">Billing Info</div>
        <ul className="list-unstyled normal-text">
          <ul className="list-unstyled normal-text d-flex justify-content-between m-0 p-0">
            <li className="my-2 heading-text">Base Fare</li>
            <li className="my-2 heading-text fw-semibold">₹{base_price}</li>
          </ul>
          <ul className="list-unstyled normal-text d-flex justify-content-between m-0 p-0">
            <li className="my-2 heading-text">Protection Plan</li>
            <li className="my-2 heading-text fw-semibold">₹{protectionPlanAmount}</li>
          </ul>
          <ul className="list-unstyled normal-text d-flex justify-content-between m-0 p-0">
            <li className="my-2 heading-text">Referral Discount(10%)</li>
            <li className="my-2 heading-text fw-semibold">₹{referralDiscountAmount ? referralDiscountAmount : 0}</li>
          </ul>
          <ul className="list-unstyled normal-text d-flex justify-content-between m-0 p-0">
            <li className="my-2 heading-text">Coupon Discount</li>
            <li className="my-2 heading-text fw-semibold">₹{discountAmount ? discountAmount : 0}</li>
          </ul>
        </ul>
        <div>
          {/* {couponButton ? (
            <div className="d-flex">
              <input
                type="search"
                id="promocode"
                value={promoCode}
                placeholder="Promo code"
                style={{ textTransform: 'uppercase' }}
                onChange={(event) => {
                  this.handlePromoCode(event);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace') {
                    event.preventDefault();
                  }
                }}
                className="std-input small-text col-7 border-0 border-bottom input-promocode-border"
              />
              <button
                className="bg-transparent border-bottom border-0 input-promocode-border"
                onClick={(e) => {
                  this.handleClearPromoCode(e);
                }}
              >
                x
              </button>

              <button className="button-box book-button-color border-0 small-text" onClick={this.handleApply} style={{ marginLeft: '0.5rem' }}>
                Apply
              </button>
            </div>
          ) : (
            <button className="heading-text orange-text border-0 bg-transparent fw-semibold" onClick={this.handleCouponButton}>
              Apply Coupon Code
            </button>
          )} */}
          <button
            type="button"
            className="heading-text orange-text border-0 bg-transparent fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              this.handleClearPromoCode();
            }}
          >
            Apply Coupon Code
          </button>
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  {/* <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Apply promocode
                  </h1> */}
                  <button
                    type="button"
                    className="btn-close small-text"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      this.handleClearPromoCode();
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <input
                      type="search"
                      id="promocode"
                      value={promoCode}
                      placeholder="Promo code"
                      style={{ textTransform: 'uppercase' }}
                      onChange={(event) => {
                        this.handlePromoCode(event);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Backspace') {
                          event.preventDefault();
                        }
                      }}
                      className="std-input small-text col-7 border-0 border-bottom input-promocode-border"
                    />
                    <button
                      className="button-box book-button-color border-0 small-text"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        this.handleApply(this.state.promoCode);
                      }}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      Apply
                    </button>
                  </div>
                  <div className="d-flex">
                    {this.state.couponList.active_coupons &&
                      this.state.couponList.active_coupons!.map((item: any, index) => {
                        return (
                          <button
                            className="coupon-card m-2 border-0 "
                            key={index}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                              this.setState({ promoCode: item.coupon_title });
                              this.handleApply(item.coupon_title);
                            }}
                          >
                            <div className="">
                              <div className="heading-text fw-bold coupon-title my-2">{item.coupon_title}</div>
                              <div className="sub-heading-text fw-bold text-dark my-2">{item.coupon_percentage}% OFF</div>
                              <div className="small-text fw-bold coupon-title my-2">(Max. discount upto ₹{item.coupon_max_discount})</div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                  <div className="d-flex">
                    {this.state.couponList.used_coupons &&
                      this.state.couponList.used_coupons!.map((item: any, index) => {
                        return (
                          <button
                            className="coupon-card m-2 border-0 disabled"
                            key={index}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                              this.setState({ promoCode: item.coupon_title });
                              this.handleApply(item.coupon_title);
                            }}
                          >
                            <div className="">
                              <div className="heading-text fw-bold coupon-title my-2">{item.coupon_title}</div>
                              <div className="sub-heading-text fw-bold text-dark my-2">{item.coupon_percentage}% OFF</div>
                              <div className="small-text fw-bold coupon-title my-2">(Max. discount upto ₹{item.coupon_max_discount})</div>
                              <div className="small-text text-dark ">Already used</div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                  <div className="d-flex ">
                    {this.state.couponList.expired_coupons &&
                      this.state.couponList.expired_coupons!.map((item: any, index) => {
                        return (
                          <button
                            className="coupon-card m-2 border-0 disabled"
                            key={index}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                              this.setState({ promoCode: item.coupon_title });
                              this.handleApply(item.coupon_title);
                            }}
                          >
                            <div className="">
                              <div className="heading-text fw-bold coupon-title my-2">{item.coupon_title}</div>
                              <div className="sub-heading-text fw-bold text-darkmy-2">{item.coupon_percentage}% OFF</div>
                              <div className="small-text fw-bold coupon-title my-2">(Max. discount upto ₹{item.coupon_max_discount})</div>
                              <div className="small-text text-dark ">Coupon expired</div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
                {/* <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          {couponStatus !== '' && PromoCode_Message}
        </div>
        {checkBox ? (
          <div className="d-flex justify-content-end align-items-center mt-4">
            <div className="m-0 me-4 heading-text  fw-bold">{totalAmount}/-</div>
            <button className="button-box book-button-color border-0  heading-text " onClick={this.handleProceed}>
              Complete Booking
            </button>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-end align-items-center mt-4">
              <div className="m-0 me-4 heading-text fw-bold">{totalAmount}/-</div>
              <button className="button-box book-button-color border-0  heading-text disabled">Complete Booking</button>
            </div>
            <div className="d-flex justify-content-start flex-wrap" style={{ margin: '0.1rem 0' }}>
              <p className="blinking-text p-0 m-0 mt-2 normal-text" style={{ fontWeight: '500', color: 'red' }}>
                Read and accept the terms & condition before proceeding
              </p>
            </div>
          </>
        )}
        <div className="d-flex justify-content-start align-items-center mt-3">
          <input type="checkbox" name="" onChange={this.handleCheckBox} id="" style={{ width: '0.8rem', height: '0.8rem' }} />
          <label htmlFor="" className="heading-text ms-2">
            Agree to Terms and Condition
          </label>
        </div>
      </div>
    );
  };
  render() {
    const { loader } = this.state;
    return (
      <div className="main-card overflow-scroll large-screen-flex vh-75 m-md-5 ">
        <div className="billingPage-left-section">
          {loader ? (
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <>{this.renderCarDetailsCard()}</>
          )}
          {this.renderTerms()}
        </div>
        <div className="billingPage-right-section">
          {this.renderInsurancePlan()}
          {this.renderBill()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    totalAmount: state.billingPageReducer.totalAmount,
    searchParams: state.homePageReducer.searchParams
  };
};

const mapDispatchToProps = {
  setTotalPriceAmout
};
export default connect(mapStateToProps, mapDispatchToProps)(withNavigateHook(BillingPage));
