import { useEffect, useState } from 'react';
import WelcomeBackLogo from '../../assets/WelcomeBackLogo.png';
import SuccesTick from '../../assets/successTick.png';
import axios from 'axios';
import { resolvePostApi, resolvePostApiWithHeaders } from '../../Common/ResolveApi';
import { GetBookingDetails } from '../../graphqlQueries/CustomerDetailsQuery';
import { getCarDetailsQuery } from '../../graphqlQueries/CarDetailsQuery';
import { Link, useParams } from 'react-router-dom';
import { getCookie } from '../../components/Cookies';
import { DateTimeView } from '../../Common/DateTimeFormatter';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
};

const BookingSuccess = () => {
  let Token = getCookie('Customer_access_token');
  const { customer_booking_id } = useParams();
  const [user, setUser] = useState();
  const [BookingData, setBookingData] = useState<any>({});
  const [CarData, setCarData] = useState<any>({});

  const BookingDetails = async (customer_booking_id: string) => {
    const { verifyPayUPayment } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, GetBookingDetails(customer_booking_id), Token);
    getCarDetailsData(verifyPayUPayment.car_id, verifyPayUPayment.start_date, verifyPayUPayment.end_date);
    setBookingData(verifyPayUPayment);
  };

  const getCarDetailsData = async (car_id: any, starts: any, ends: any) => {
    try {
      const { getCarDetails } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, getCarDetailsQuery(car_id, starts, ends));
      setCarData(getCarDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    BookingDetails(customer_booking_id!);
  }, []);

  const StartDate = new Date(BookingData.start_date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
  const EndDate = new Date(BookingData.end_date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
  const Bdate = new Date(BookingData.booking_date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
  return (
    <div className="container-fluid booking-success row m-0 mt-5 ">
      <div className="col-lg-8 col-sm-12 ">
        <div className="trip-user-details-box main-card">
          <div className="trip-box-section">
            <h3>Booking details</h3>
            <ol>
              <li className="d-flex">
                <h3 className=" mb-1  m-0">Car:</h3>
                <p className="  m-0">
                  {CarData.company_name} &nbsp;{CarData.model}
                </p>
              </li>

              <li className="d-flex">
                <h3 className=" mb-1  m-0">Start Date:</h3>
                <p className=" m-0">{StartDate}</p>
              </li>
              <li className="d-flex">
                <h3 className=" mb-1  m-0">End Date:</h3>
                <p className=" m-0">{EndDate}</p>
              </li>
            </ol>
          </div>
          <div className=" trip-box-section">
            <img src={CarData.images} className=" car-card-image mb-5 mx-4" alt="" />
            <ul>
              <li className="d-flex">
                <h3 className=" mb-1 m-0">Color:</h3>
                <p className=" m-0">{CarData.color}</p>
              </li>
              <li className="d-flex">
                <h3 className=" mb-1 m-0">Manual:</h3>
                <p className=" m-0">{CarData.transmission_type}</p>
              </li>
              <li className="d-flex">
                <h3 className=" mb-1 m-0">Petrol:</h3>
                <p className=" m-0">{CarData.fuel_type}</p>
              </li>
              <li className="d-flex">
                <h3 className=" mb-1 m-0">Hatchback:</h3>
                <p className=" m-0">{CarData.car_type}</p>
              </li>
              <li className="d-flex">
                <h3 className=" mb-1 m-0">Seating Capacity:</h3>
                <p className=" m-0">{CarData.seating_capacity}</p>
              </li>
              <li className="d-flex">
                <h3 className=" mb-1 m-0">Year of manufacture:</h3>
                <p className=" m-0">{CarData.year_of_manufacturing}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-12 mb-5 mx-auto d-flex  align-items-center justify-content-center">
        <div className="main-card shadow border rounded-4 sign-up-form-box col-12 ">
          <div className="d-flex justify-content-center">
            <img src={WelcomeBackLogo} width="80rem" alt="..." />
          </div>
          <div className=" welcome-text my-3">
            <div className="d-flex justify-content-center">
              <img src={SuccesTick} style={{ width: '15rem', height: '15rem' }} />
            </div>
            <h3 className="d-flex justify-content-center">Booking confirmed </h3>
            <ul className="p-0 m-0">
              <li className="d-flex justify-content-between">
                <h3>Amount paid:</h3>
                <p>₹{BookingData.booking_amount}</p>
              </li>
              {/* <li className="d-flex justify-content-between">
                <h3>Transaction id:</h3>
                <p>{BookingData.booking_id}</p>
              </li> */}
              <li className="d-flex justify-content-between">
                <h3>Transaction Date:</h3>
                <p>{DateTimeView(BookingData.booking_date)}</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="d-flex justify-content-center">
              Go to &nbsp;
              <Link to="/profile" style={{ color: 'orange' }}>
                My Account
              </Link>{' '}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
