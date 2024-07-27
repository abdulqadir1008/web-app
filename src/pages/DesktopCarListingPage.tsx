import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { OwnerGetAllLIstingsQuery, OwnerGetCarsQuery, OwnerGetListingBookingsQuery } from '../graphqlQueries/OwnerQuery';
import { getCookie } from '../components/Cookies';
import AccordionButton from '../assets/AccordionButton.png';
import AccordionButtonUp from '../assets/AccordionButtonUp.png';
import Close from '../assets/Close.png';
import TataN1 from '../assets/TataN1.jpg';
import { resolvePostApi, resolvePostApiWithHeaders } from '../Common/ResolveApi';
import { getCarDetailsQuery } from '../graphqlQueries/CarDetailsQuery';
import { useSearchParams } from 'react-router-dom';

interface I_CarListData {
  car_number: string;
  company_name: string;
  model: string;
}
interface I_ListingDetails {
  listing_start_date: string;
  listing_end_date: string;
  listing_id: string;
}
interface I_ListingBookings {
  start_date: string;
  end_date: string;
  car_number: string;
  owner_name: string;
  customer_name: string;
}
const DesktopCarListingPage = () => {
  const [SearchParams] = useSearchParams({ car_id: '', lat: '', lng: '', address: '', starts: '', ends: '' });
  let carId = SearchParams.get('car_id');
  let lat = SearchParams.get('lat');
  let lng = SearchParams.get('lng');
  let address = SearchParams.get('address');
  let starts = SearchParams.get('starts');
  let ends = SearchParams.get('ends');
  const [SelectedCar, setSelectedCar] = useState<I_CarListData>();
  const [CarListData, setCarListData] = useState<I_CarListData[]>([]);
  const [ListingDetails, setListingDetails] = useState<I_ListingDetails[]>([]);
  const [ListingBookings, setListingBookings] = useState<I_ListingBookings[]>([]);
  const [ListingId, setListingId] = useState<string>();
  const [buttonValue, setButtonValue] = useState(false);

  let Token = getCookie('Owner_access_token');

  const GetOwnerCarsData = async () => {
    try {
      const { getOwnerCars } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, OwnerGetCarsQuery(), Token);
      setSelectedCar(getOwnerCars[0]);

      setCarListData(getOwnerCars);
    } catch (error) {
      alert(error);
    }
  };
  const handleSelectCarNumber = async (e: any, starts: any, ends: any) => {
    await CarDetailsData(e.value, starts, ends);
  };

  const CarDetailsData = async (car_number: string, starts: any, ends: any) => {
    try {
      const { getCarDetails } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, getCarDetailsQuery(car_number, starts, ends));
      setSelectedCar(getCarDetails);
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    if (Token) {
      GetOwnerCarsData();
    }
  }, []);

  const GetAllListingData = async (SelectedCar: any) => {
    try {
      const { getAllListings } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, OwnerGetAllLIstingsQuery(SelectedCar));
      setListingDetails(getAllListings);
    } catch (error) {
      alert('error');
    }
  };
  React.useEffect(() => {
    if (Token) {
      GetAllListingData(SelectedCar);
    }
  }, [SelectedCar]);

  const handleListingId = async (listing_id: any) => {
    await GetListingBookingsData(listing_id);
    setListingId(listing_id);
  };
  const GetListingBookingsData = async (listing_id: string) => {
    try {
      const { getListingBookings } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, OwnerGetListingBookingsQuery(listing_id));
      setListingBookings(getListingBookings[0]);
      setListingBookings(getListingBookings);
    } catch (error) {
      alert(error);
    }
  };

  const handleClick = (e: any) => {
    if (buttonValue == false) {
      setButtonValue(true);
    } else {
      setButtonValue(false);
    }
  };
  const value = 4;
  return (
    <div className="container-fluid p-0 body-color desktop-view ">
      <div className="offcanvas offcanvas-start w-100" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
        <div className="offcanvas-header d-flex justify-content-end">
          <button type="button" className="close-button" data-bs-dismiss="offcanvas" aria-label="Close">
            <img className="close-image" src={Close} alt="" />
          </button>
        </div>
        <div className="offcanvas-body ">
          <div className="row p-0 m-0 ">
            <div className="col-4 m-0 p-0 mobile-view ">
              <div className="list col-4">
                <div className="d-flex m-list-top-section  ms-0">
                  <div className="d-l-card-heading">
                    {' '}
                    {SelectedCar?.company_name} {SelectedCar?.model}{' '}
                  </div>
                  <div className="d-flex align-items-end" style={{ fontSize: '1rem', marginLeft: '0.7rem', color: '#7b7b7b' }}>
                    2019 25k driven
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="">
                    <select
                      className="sel"
                      aria-label="Default select example"
                      onChange={(e) => {
                        handleSelectCarNumber(e.target, starts, ends);
                      }}
                    >
                      {CarListData.map((items) => {
                        const { car_number, model, company_name } = items;
                        return (
                          <option key={car_number} className="sl" defaultValue={SelectedCar?.car_number}>
                            {car_number}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <div className="d-l-card-heading">Lifetime Earnings</div>
                    <div className="highlighted-text">Rs. 50,000/-</div>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <img src={TataN1} className="image-list" alt="" />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-l-card-heading">Listing Details</div>
                  <div className="d-flex align-items-end">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center '
                      }}
                    >
                      <Rating name="text-feedback" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                      <Box sx={{ ml: 0.2 }}>10 ratings</Box>
                    </Box>
                  </div>
                </div>
                {ListingDetails.map((items) => {
                  const { listing_start_date, listing_end_date, listing_id } = items;
                  return (
                    <button
                      role="button"
                      data-bs-toggle="button"
                      aria-pressed="true"
                      key={listing_id}
                      style={{ border: 'none', background: 'transparent', width: '100%' }}
                      onClick={() => {
                        handleListingId(listing_id);
                      }}
                    >
                      <div className="d-listing-card-or d-flex justify-content-between">
                        <div>
                          <div className="d-l-card-heading bk">
                            Start Date <span className="d-l-card-text space">{listing_start_date}</span>
                          </div>
                          <div className="d-l-card-heading">
                            End Date&nbsp; &nbsp;<span className="d-l-card-text space">{listing_end_date}</span>
                          </div>
                        </div>
                        <div className="d-flex flex-column justify-content-between">
                          <div className="d-l-card-heading">Total Earnings</div>
                          <div className="price-heading d-flex justify-content-center">50,000/-</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-7 col-12 ">
              {ListingBookings.map((items) => {
                const { customer_name, owner_name, start_date, end_date, car_number } = items;
                return (
                  <div key={start_date} className="d-listing-card ">
                    <div className="d-flex justify-content-between">
                      <div className="car-card-section ">
                        <div className="d-l-card-heading bk">
                          Booking Id: ABCD1234 <button className="d-l-invoice-button">Download Invoice</button>
                        </div>
                        <div className="d-l-card-heading bk">
                          Start Date: &nbsp;<span className="d-l-card-text">{start_date}</span>
                        </div>
                        <div className="d-l-card-heading">
                          End Date:&nbsp; &nbsp; <span className="d-l-card-text">{end_date}</span>
                        </div>
                      </div>
                      <div className="car-card-section">
                        <div className="d-l-card-text bk">{owner_name}</div>
                        <div>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Rating name="text-feedback" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                            <Box sx={{ ml: 0.2 }}></Box>
                          </Box>
                        </div>
                      </div>
                      <div className="car-card-section d-flex flex-column justify-content-between">
                        <div className="highlighted-text d-flex justify-content-end">Live/Upcoming</div>
                        <div className="d-l-card-heading">
                          Estimated Earnings &nbsp; <span className="price-card">2,000/-</span>{' '}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="accordion-item">
                        <div className="accordion-header d-flex justify-content-center " id="headingOne">
                          <div className="">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="false"
                              onClick={(e) => {
                                handleClick(e);
                              }}
                              aria-controls="collapseOne"
                            >
                              {buttonValue == false ? <img src={AccordionButton} alt="" /> : null}
                            </button>
                          </div>
                        </div>
                        <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <div className="d-flex justify-content-between  ">
                              <div className="accordion-body-content-card   d-flex justify-content-between  " style={{ width: '30%' }}>
                                <div className="">
                                  <div className="d-flex justify-content-center d-l-card-text bk">Pickup Fuel</div>
                                  <div className="d-flex justify-content-center d-l-card-text">100%</div>
                                  <div>
                                    <img src={TataN1} className="i" alt="" />
                                  </div>
                                </div>
                                <div className="small-box">
                                  <div className="d-flex justify-content-center d-l-card-text bk">Drop Fuel</div>
                                  <div className="d-flex justify-content-center d-l-card-text">100%</div>
                                  <div>
                                    <img src={TataN1} className="i" alt="" />
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-body-content-card  " style={{ width: '30%' }}>
                                <div className="d-l-card-text d-flex justify-content-between kl">
                                  <div> Fuel compensation</div>
                                  <div className="d-flex justify-content-end">1000</div>{' '}
                                </div>
                                <div className="d-l-card-text d-flex justify-content-between kl">
                                  <div> Accessories Compensation</div>
                                  <div className="d-flex justify-content-end">1000</div>{' '}
                                </div>
                                <div className="d-l-card-text d-flex justify-content-between kl">
                                  <div> Government challans</div>
                                  <div className="d-flex justify-content-end">1000</div>{' '}
                                </div>
                                <div className="d-l-card-text d-flex justify-content-between kl">
                                  <div> Damage compensation</div>
                                  <div className="d-flex justify-content-end">1000</div>{' '}
                                </div>
                                <div className="d-l-card-heading border-top d-flex justify-content-between">
                                  <div> Total extras</div>
                                  <div className="d-flex justify-content-end">4000</div>{' '}
                                </div>
                              </div>
                              <div className="accordion-body-content-card  " style={{ width: '30%' }}>
                                <div className="d-l-card-text d-flex justify-content-between kl">
                                  <div> Total Trip Amount</div>
                                  <div className="d-flex justify-content-end">1000</div>{' '}
                                </div>
                                <div className="d-l-card-text d-flex justify-content-between kl">
                                  <div> Owner Share 80% of booking</div>
                                  <div className="d-flex justify-content-end">1000</div>{' '}
                                </div>
                                <div className="d-l-card-text d-flex justify-content-between kl">
                                  <div> TDS @1%</div>
                                  <div className="d-flex justify-content-end">-100</div>{' '}
                                </div>
                                <div className="d-l-card-text d-flex justify-content-between kl">
                                  <div> Device Maintenance Charges</div>
                                  <div className="d-flex justify-content-end">-1000</div>{' '}
                                </div>
                                <div className="d-l-card-heading border-top d-flex justify-content-between">
                                  <div> Total extras</div>
                                  <div className="d-flex justify-content-end">4000</div>{' '}
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center">
                              <div>
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="false"
                                  onClick={(e) => {
                                    handleClick(e);
                                  }}
                                  aria-controls="collapseOne"
                                >
                                  {buttonValue == true ? <img src={AccordionButtonUp} alt="" /> : null}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopCarListingPage;
