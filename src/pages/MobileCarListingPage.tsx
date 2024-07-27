import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React, { useState } from 'react';
import AccordionButton from '../assets/AccordionButton.png';
import AccordionButtonUp from '../assets/AccordionButtonUp.png';
import TataN1 from '../assets/TataN1.jpg';

const MobileCarListingPage = () => {
  const [buttonValue, setButtonValue] = useState(false);
  const handleClick = (e: any) => {
    if (buttonValue == false) {
      setButtonValue(true);
    } else {
      setButtonValue(false);
    }
  };
  const value = 4;
  return (
    <div className="container-fluid body-color m-0 p-0 mobile-view ">
      <div className="row m-0 p-0">
        <div className="col-12">
          <div className="d-flex m-list-top-section mb-0">
            <div className="cb">Maruti Suzuki Baleno </div>
            <div className="cc">2019 25k driven</div>
          </div>
          <div className="d-flex justify-content-between m-list-top-section ">
            <div>
              <div>
                <select className="sel" aria-label="Default select example">
                  <option className="sl">1234567890</option>
                  <option className="sl" value="1">
                    TSF123
                  </option>
                  <option className="sl" value="2">
                    TSK234
                  </option>
                  <option className="sl" value="3">
                    TFD3452344
                  </option>
                </select>
              </div>
              <div style={{ marginTop: '0.7rem' }}>
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
            <div className="d-flex flex-column justify-content-between">
              <div className="d-l-card-heading">Lifetime earnings</div>
              <div className="highlighted-text d-flex justify-content-center">50,000/-</div>
            </div>
            <div>
              <img src={TataN1} className="m-image" alt="" />
            </div>
          </div>
          <div className="d-listing-card ">
            <div className="d-flex justify-content-between">
              <div className="car-card-section ">
                <div className="d-l-card-heading bk">Booking Id: ABCD1234</div>
                <div className="d-l-card-heading bk">
                  Start Date: &nbsp;<span className="d-l-card-text">01 Dec 2022 6:00AM</span>
                </div>
                <div className="d-l-card-heading">
                  End Date:&nbsp; &nbsp; <span className="d-l-card-text">01 Dec 2022 6:00AM</span>
                </div>
                <div className="car-card-section">
                  <button className="m-l-invoice-button">Download Invoice</button>
                </div>
              </div>

              <div className="car-card-section d-flex flex-column justify-content-between">
                <div className="highlighted-text d-flex justify-content-end">Live/Upcoming</div>
                <div className="bk">
                  <div className="d-l-card-text  d-flex justify-content-end"> Sai Sundar Kudipudi</div>
                  <div className="d-flex justify-content-end ">
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
                    <div className="d-flex flex-column  justify-content-between  ">
                      <div className="accordion-body-content-card   d-flex justify-content-between  ">
                        <div className="">
                          <div className="d-flex justify-content-center d-l-card-text bk">Pickup Fuel (100%)</div>
                          <div>
                            <img src={TataN1} className="m-i" alt="" />
                          </div>
                        </div>
                        <div className="small-box">
                          <div className="d-flex justify-content-center d-l-card-text bk">Drop Fuel (100%)</div>
                          <div>
                            <img src={TataN1} className="m-i" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="d-l-card-heading">Extras</div>

                      <div className="accordion-body-content-card  ">
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
                      <div className="d-l-card-heading">Summary</div>
                      <div className="accordion-body-content-card  ">
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
        </div>
      </div>
    </div>
  );
};

export default MobileCarListingPage;
