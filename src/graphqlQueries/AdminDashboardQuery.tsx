function getFullBookingDetailsQuery(booking_id:string) {
  return `
        query {
  getFullBookingInfoByBookingId(
    booking_id: "${booking_id}"
  ) {
    booking_details {
      booking_date
      start_date
      end_date
      actual_end_date
      actual_start_date
    }
    customer_details {
      full_name
      phone_number
      email_id
    }
    car_details {
      car_id
      model
      fuel_type
      transmission_type
      location {
        lats
        longs
      }
    }
    owner_details {
      full_name
      phone_number
    }
  }
}
`;
}
export { getFullBookingDetailsQuery };
