import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Failure from '../../assets/Failure.png';
import WelcomeBackLogo from '../../assets/WelcomeBackLogo.png';
import { resolvePostApiWithHeaders } from '../../Common/ResolveApi';
import { getCookie } from '../../components/Cookies';
import { GetBookingDetails } from '../../graphqlQueries/CustomerDetailsQuery';
function BookingFailure() {
  let Token = getCookie('Customer_access_token');
  const { customer_booking_id } = useParams();

  const BookingDetails = async (customer_booking_id: string) => {
    await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, GetBookingDetails(customer_booking_id), Token);
  };
  useEffect(() => {
    BookingDetails(customer_booking_id!);
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="main-card shadow border rounded-4 sign-up-form-box col-md-6">
        <div className="d-flex justify-content-center">
          <img src={WelcomeBackLogo} width="80rem" alt="..." />
        </div>
        <div className=" welcome-text my-3">
          <div className="d-flex justify-content-center">
            <img src={Failure} style={{ width: '13rem', height: '13rem' }} />
          </div>
          <h3 className="d-flex justify-content-center my-5">Booking {customer_booking_id} Failed </h3>
          <h3 className="d-flex justify-content-center">
            Return back to&nbsp;
            <Link to="/" style={{ color: 'orange' }}>
              Home Page
            </Link>{' '}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default BookingFailure;
