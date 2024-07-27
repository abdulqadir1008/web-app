import React, { useEffect, useState } from 'react';
import { resolvePostApi } from '../../Common/ResolveApi';
import { getFullBookingDetailsQuery } from '../../graphqlQueries/AdminDashboardQuery';
import { DirectionModule } from '../../components/DirectionModule';

function BookingDetails() {
  const [selectedBooking, setSelectedBooking] = useState();
  const [BookingInfo, setBookingInfo] = useState({
    booking_details: {
      booking_date: '',
      start_date: '',
      end_date: '',
      actual_end_date: '',
      actual_start_date: ''
    },
    customer_details: {
      full_name: '',
      phone_number: '',
      email_id: ''
    },
    car_details: {
      car_id: '',
      model: '',
      fuel_type: '',
      transmission_type: '',
      location: {
        lats: '',
        longs: ''
      }
    },
    owner_details: {
      full_name: '',
      phone_number: ''
    }
  });
  const Data1 = [
    {
      booking_id: '4665a62c-8da8-4695-80f2-1c391f003e2c',
      start_date: 'May 1, 2023 10:00 am',
      end_date: 'May 10, 2023 10:00 am'
    },
    {
      booking_id: 'B1234567890',
      start_date: 'May 1, 2023 10:00 am',
      end_date: 'May 10, 2023 10:00 am'
    },
    {
      booking_id: 'C1234567890',
      start_date: 'May 1, 2023 10:00 am',
      end_date: 'May 10, 2023 10:00 am'
    }
  ];
  const GetAllBookingInfo = async (selectedBooking: any) => {
    try {
      const { getFullBookingInfoByBookingId } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, getFullBookingDetailsQuery(selectedBooking!));
      setBookingInfo(getFullBookingInfoByBookingId);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleSelectBookingId = () => {
  //   if (selectedBooking) {
  //     GetAllBookingInfo(selectedBooking);
  //   }
  // };
  useEffect(() => {
    if (selectedBooking) {
      GetAllBookingInfo(selectedBooking);
    }
  }, [selectedBooking]);

  return (
    <div className="d-md-flex">
      <div className="main-card col-md-5">
        <div className="d-flex justify-content-between">
          <h3>Booking Id</h3>
          <h3>Start Date & Time</h3>
          <h3>End Date & Time</h3>
        </div>
        {Data1.map((item) => {
          const { booking_id, start_date, end_date } = item;
          return (
            <div key={booking_id} className="d-flex justify-content-between">
              <button
                className="border border-0 bg-transparent normal-text p-0 d-flex align-items-start"
                value={booking_id}
                onClick={(e: any) => {
                  setSelectedBooking(e.target.value);
                  // handleSelectBookingId();
                }}
              >
                {booking_id}
              </button>
              <p>{start_date}</p>
              <p>{end_date}</p>
            </div>
          );
        })}
      </div>
      <div className="main-card col-md-5">
        <h3>Booking Details ({selectedBooking})</h3>
        <table className="table table-bordered normal-text">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Booked</th>
              <td>{BookingInfo.booking_details.start_date}</td>
              <td>{BookingInfo.booking_details.end_date}</td>
            </tr>
            <tr>
              <th scope="row">Actual</th>
              <td>May 1, 2023 10:00 am</td>
              <td>May 1, 2023 10:00 am</td>
            </tr>
          </tbody>
        </table>
        <h3>Payment Details</h3>
        <h3>Customer Details</h3>
        <h3>Car Details</h3>
        {BookingInfo.car_details.location.lats && (
          <div className=" button-box book-button-color p-1 d-inline-flex">{DirectionModule(BookingInfo.car_details.location.lats, BookingInfo.car_details.location.longs)}</div>
        )}
      </div>
    </div>
  );
}

export default BookingDetails;
