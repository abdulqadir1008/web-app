import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { resolvePostApi, resolvePostApiWithHeaders } from '../../Common/ResolveApi';
import { GetBookingDetails, GetCustomerBookingDetails, carAvailabilityDateQuery, getBookingDetailsById } from '../../graphqlQueries/CustomerDetailsQuery';
import { getCookie } from '../../components/Cookies';
import { getFullBookingDetailsQuery } from '../../graphqlQueries/AdminDashboardQuery';
import { useParams } from 'react-router-dom';
import { DateTimeFormatter, DateTimeView, ReceivedDateTimeFormatter } from '../../Common/DateTimeFormatter';
import { CircularProgress } from '@mui/material';
interface I_BookingDetailsById {
  car_id: string;
  car_number: string;
  start_date: Date;
  end_date: Date;
  actual_start_date: any;
  actual_end_date: any;
  booking_date: Date;
  booking_amount: number;
  booking_status: any;
  payment_status: any;
  protection_plan_amount: number;
  protection_plan_type: any;
  payment_info: any;
}
function BookingUpdate(props: any) {
  const [bookingData, setBookingData] = useState<I_BookingDetailsById>();
  const [minDate, setMinDate] = useState<Date>();
  const [maxDate, setMaxDate] = useState<Date>();
  const [newEndDate, setNewEndDate] = useState<Date>();
  const [ExcludedTimes, setExcludedTimes] = useState<Date[]>();
  const [loader, setLoader] = useState(true);
  const [messages, setMessages] = useState({ errorMessage: '', bookingDateMessage: '' });

  const Token = getCookie('Customer_access_token');

  const BookingDetails = async (customer_booking_id: string) => {
    try {
      setLoader(true);
      const { getBookingDetailsByBookingId } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, getBookingDetailsById(customer_booking_id), Token);
      const { carAvailabilityDate } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, carAvailabilityDateQuery(customer_booking_id), Token);
      setBookingData(getBookingDetailsByBookingId);
      setNewEndDate(new Date(ReceivedDateTimeFormatter(getBookingDetailsByBookingId.end_date)));
      setMinDate(new Date(ReceivedDateTimeFormatter(getBookingDetailsByBookingId.end_date)));
      setMaxDate(new Date(ReceivedDateTimeFormatter(carAvailabilityDate.next_available_date)));
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button className="button-datePicker  heading-text" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  let ExcludedTimesArray: any = [];
  const ExcludeStartTime = () => {
    const MinTime = new Date(minDate!);
    const MinHour = new Date(MinTime).getHours();
    const MinMinutes = new Date(MinTime).getMinutes();
    /*****/
    const MaxTime = new Date(maxDate!);
    const MaxHour = new Date(MaxTime).getHours();
    const MaxMinutes = new Date(MaxTime).getMinutes();
    MaxTime.setHours(MaxHour);
    /****/
    if (MaxTime!.getTime() < MinTime!.getTime()) {
      setMessages({ ...messages, errorMessage: 'Car not available to extend' });
      setExcludedTimes([]);
    } else if (
      minDate!.getDate() === maxDate!.getDate() &&
      minDate?.getMonth() === maxDate?.getMonth() &&
      minDate?.getFullYear() === maxDate?.getFullYear() &&
      MaxTime!.getTime() > MinTime!.getTime()
    ) {
      for (let hour = 0; hour <= MinHour; hour++) {
        for (let minute = 0; minute <= 30; minute += 30) {
          if (hour === MinHour && minute >= MinMinutes) {
            break;
          }
          const time = new Date();
          time.setHours(hour);
          time.setMinutes(minute);
          ExcludedTimesArray.push(time);
          setExcludedTimes(ExcludedTimesArray);
        }
      }
      for (let hour = MaxHour; hour <= 23; hour++) {
        for (let minute = hour === MaxHour ? MaxMinutes + 30 : 0; minute <= 30; minute += 30) {
          const time = new Date();
          time.setHours(hour);
          time.setMinutes(minute);
          ExcludedTimesArray.push(time);
        }
        setExcludedTimes(ExcludedTimesArray);
      }
      setMessages({ ...messages, bookingDateMessage: `Car available till ${DateTimeView(DateTimeFormatter(MaxTime))}` });
    } else if (newEndDate!.getDate() === new Date(minDate!).getDate() && newEndDate?.getMonth() === minDate?.getMonth() && newEndDate?.getFullYear() === minDate?.getFullYear()) {
      if (newEndDate!.getTime() < MinTime.getTime()) {
        newEndDate!.setTime(MinTime.getTime());
      }
      setExcludedTimes([]);
      for (let hour = 0; hour <= MinHour; hour++) {
        for (let minute = 0; minute <= 30; minute += 30) {
          if (hour === MinHour && minute >= MinMinutes) {
            break;
          }
          const time = new Date();
          time.setHours(hour);
          time.setMinutes(minute);
          ExcludedTimesArray.push(time);
          setExcludedTimes(ExcludedTimesArray);
        }
      }
      setMessages({ ...messages, bookingDateMessage: `Car available till ${DateTimeView(DateTimeFormatter(MaxTime))}` });
    } else if (newEndDate!.getDate() === new Date(maxDate!).getDate() && newEndDate?.getMonth() === maxDate?.getMonth() && newEndDate?.getFullYear() === maxDate?.getFullYear()) {
      if (newEndDate!.getTime() > MaxTime.getTime()) {
        newEndDate!.setTime(MaxTime.getTime());
      }
      setExcludedTimes([]);
      for (let hour = MaxHour; hour <= 23; hour++) {
        for (let minute = hour === MaxHour ? MaxMinutes + 30 : 0; minute <= 30; minute += 30) {
          const time = new Date();
          time.setHours(hour);
          time.setMinutes(minute);
          ExcludedTimesArray.push(time);
        }
      }

      setExcludedTimes(ExcludedTimesArray);
      setMessages({ ...messages, bookingDateMessage: `Car available till ${DateTimeView(DateTimeFormatter(MaxTime))}` });
    } else {
      setExcludedTimes([]);
    }
  };
  useEffect(() => {
    if (!loader) {
      ExcludeStartTime();
    }
  }, [newEndDate]);
  useEffect(() => {
    BookingDetails(props.custId!);
  }, []);

  return (
    <div>
      {loader ? (
        <CircularProgress color="inherit" />
      ) : messages.errorMessage !== '' ? (
        <div className="heading-text text-danger">{messages.errorMessage}</div>
      ) : (
        <>
          <DatePicker
            className="datePicker-input"
            selected={newEndDate}
            onChange={(date) => setNewEndDate(date!)}
            showTimeSelect
            excludeTimes={ExcludedTimes}
            minDate={new Date(minDate!)}
            maxDate={new Date(maxDate!)}
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<ExampleCustomInput />}
          />
          <div className="heading-text mt-2"> {messages.bookingDateMessage}</div>
        </>
      )}
    </div>
  );
}

export default BookingUpdate;
// <div id="loading-bar-spinner" className="spinner">
//   <div className="spinner-icon"></div>
// </div>
