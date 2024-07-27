import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getCarDetailsQuery } from '../graphqlQueries/CarDetailsQuery';
import TataN1 from '../assets/TataN1.jpg';
import TataN2 from '../assets/TataN2.jpg';
import TataN3 from '../assets/TataN3.jpg';
import { getCookie } from '../components/Cookies';
import { CustomerDetailsQuery } from '../graphqlQueries/CustomerDetailsQuery';
import { resolvePostApi, resolvePostApiWithHeaders } from '../Common/ResolveApi';

const Wishlist = () => {
  const [SearchParams] = useSearchParams({ car_id: '', lat: '', lng: '', address: '', starts: '', ends: '' });
  let carId = SearchParams.get('car_id');
  let lat = SearchParams.get('lat');
  let lng = SearchParams.get('lng');
  let address = SearchParams.get('address');
  let starts = SearchParams.get('starts');
  let ends = SearchParams.get('ends');
  const Token = getCookie('Customer_access_token');
  const getFav = async (starts: any, ends: any) => {
    try {
      const { getCustomerDetails } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, CustomerDetailsQuery(), Token);
      getData(getCustomerDetails.wishlist, starts, ends);
    } catch (error) {}
  };

  const [carData, setCarData] = useState<any[]>([]);
  const getData = async (favorite: any, starts: any, ends: any) => {
    try {
      let carDetailsArray: any[] = [];
      favorite.every(async (item: any) => {
        const { getCarDetails } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, getCarDetailsQuery(item, starts, ends));
        carDetailsArray.push(getCarDetails);
      });
      setCarData(carDetailsArray);
    } catch (error) {}
  };

  useEffect(() => {
    getFav(starts, ends);
  }, []);

  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );
  const carIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="97px" height="52px " fill="currentColor" className="bi bi-car-front-fill" viewBox="0 0 16 16">
      <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
    </svg>
  );
  const manIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="52px" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  );
  const dotIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="120px" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div>
      <div className="container my-4">
        {carData.map((items) => {
          const { car_number, company_name, model, color, car_type, fuel_type } = items;
          return (
            <div className="my-4 text-black" key={car_number}>
              <div className="border bg-light border-dark mx-4 rounded-5 p-3 m-0">
                <div className="p-4" style={{ width: '925px' }}>
                  {/* <Typography>Accordion Demo</Typography> */}
                  <div className="d-flex">
                    <div className=" ms-4 me-5 ">
                      <div className="" style={{ width: '119px', height: '27px', marginBottom: '38px' }}>
                        <p style={{ fontWeight: '700px', fontSize: '14px' }}>
                          {model} <i className="bi bi-star"></i>
                        </p>
                        <p></p>
                      </div>
                      <div style={{ width: '230px', height: '208px' }}>
                        <div id={car_number} className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-inner">
                            <div className="carousel-item active">
                              <img src={TataN1} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                              <img src={TataN2} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                              <img src={TataN3} className="d-block w-100" alt="..." />
                            </div>
                          </div>
                          <button className="carousel-control-prev" type="button" data-bs-target={'#' + `${car_number}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button" data-bs-target={'#' + `${car_number}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>
                          <p className="m-0" style={{ fontWeight: '400px', fontSize: '14px' }}>
                            Rating
                          </p>
                          <div>
                            {icon} {icon} {icon} {icon} {icon}
                          </div>
                        </div>
                      </div>
                      <div className="my-4">
                        <p style={{ width: '115px', fontWeight: '400px', fontSize: '14px' }}>Fuel type</p>
                        <p style={{ width: '162px', height: '53px', color: '#989898', fontWeight: '400px', fontSize: '14px' }}>{fuel_type}</p>
                      </div>
                      <div>
                        <p style={{ width: '175px', height: '53px', color: '#989898', fontWeight: '400px', fontSize: '14px' }}>Manual Driving</p>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex mx-5">
                        <div>{manIcon}</div>
                        <div>{dotIcon}</div>
                        <div>{carIcon}</div>
                      </div>
                      <div className="mx-5 my-4">
                        <p style={{ width: '115px', fontWeight: '400px', fontSize: '14px' }}>Price</p>
                        <div className="d-flex">
                          <p className="border border-dark p-2  me-3" style={{ width: '140px', fontWeight: '400px', fontSize: '14px' }}>
                            Rs. 2000/hour
                          </p>
                          <p className="border border-dark p-2 mx-3" style={{ width: '140px', fontWeight: '400px', fontSize: '14px' }}>
                            Rs. 3000
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="border border-dark p-2  me-3" style={{ width: '140px', fontWeight: '400px', fontSize: '14px' }}>
                            Rs. 5000
                          </p>
                          <p className="border border-dark p-2 mx-3" style={{ width: '140px', fontWeight: '400px', fontSize: '14px' }}>
                            Rs. 20,000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="d-flex  p-2 mb-4 ">
                      <div className="d-flex ">
                        <div style={{ width: '97px', height: '52px' }}>{carIcon}</div>
                        <div style={{ width: '129px', height: '27px' }}>
                          <p style={{ fontWeight: '400px', fontSize: '14px', color: '#393939' }}>{car_type}</p>
                        </div>
                      </div>
                      <div className="me-5" style={{ width: '127px', height: '46px', paddingLeft: '75px' }}>
                        <p style={{ fontWeight: '400px', fontSize: '14px' }}>Color</p>
                        <p style={{ width: '162px', height: '52px', color: '#989898', fontWeight: '400px', fontSize: '14px' }}>{color}</p>
                      </div>
                      <div className="mx-auto">
                        <button className="border border-dark px-4 rounded-4 p-2" onClick={() => {}} style={{ width: '220px', borderRadius: '20.5px', fontWeight: '700', fontSize: '14px' }}>
                          Book Now
                        </button>
                        <div className="d-flex ">
                          <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={(e) => {}} />
                          <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="compare" id={'flexCheckDefault' + `${car_number}`} onChange={(e) => {}} />
                          </FormGroup>
                          <div className="d-flex align-items-center"></div>
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
  );
};

export default Wishlist;
