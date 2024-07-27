import { SignUpDateTimeFormatter } from '../Common/DateTimeFormatter';

function createBookingQuery(carNumber: any, start_date: any, end_date: any) {
  return `mutation{
        createBooking(car_number: "${carNumber}", dateInputs:{
          start_date: "${start_date}"
          end_date: "${end_date}"
        }){
          start_date
          end_date
        }
      }`;
}
function CustomerLoginQuery(login_id: any, password: any) {
  return `mutation{
        CustomerLogin(customerLoginDetailsInput:{
          login_id:"${login_id}"
          password:"${password}"
        })
        {
          access_token
          refresh_token
          display_name
        }
      }`;
}
function UpdateCustomerQuery(FirstName: any, DisplayName: any, EmailId: any, PhoneNumber: any, DateOfBirth: any) {
  return `mutation {
        UpdateCustomer(
          UpdateCustomerDetailsInput: {
            full_name: "${FirstName}"
            display_name: "${DisplayName}"
            email_id: "${EmailId}"
            phone_number: "${PhoneNumber}"
          }
        ) {
          full_name
          display_name
        }
      }`;
}
function createCustomerProfileQuery(formValues: any) {
  const BirthDate = SignUpDateTimeFormatter(formValues.dateOfBirth);
  return `mutation{
          createCustomerProfile(customerDetailsInput:{
            full_name:"${formValues.fullName}"
            display_name:"${formValues.displayName}"
            email_id:"${formValues.email}"
            phone_number:"${formValues.phoneNumber}"
            password:"${formValues.password}"
            date_of_birth:"${BirthDate}"
            referred_by:"${formValues.referred_by}"
          })
          {
            access_token
            refresh_token
            display_name
          }
        }`;
}
function CustomerDetailsQuery() {
  return `query{
      getCustomerDetails{
        full_name
        display_name
        email_id
        phone_number
        wishlist
        referral_code
        referred_by
        date_of_birth
        kyc_status
      }
      }`;
}
function updateWishlistDetailsQuery(car_number: string) {
  return `mutation{
      updateWishlistDetails(car_number:"${car_number}"){
        wishlist
      }
    }`;
}
function GetGstDetailsQuery() {
  return `query{
  getAllGstDetails{
    gst_details_id
    gst_number
    gst_firm_name
    gst_firm_address
  }
}`;
}
function UpdateGstDetailsQuery(GstForm: any) {
  return `mutation{
  updateGstDetails(gstDetails:{
    gst_number:"${GstForm.gst_number}"
    gst_firm_name:"${GstForm.gst_firm_name}"
    gst_firm_address:"${GstForm.gst_firm_address}"
  })
  {
    gst_number
    gst_firm_name
    gst_firm_address
  }
}`;
}
function GetGstDetailQuery(gst_number: string) {
  return `query{
  getGstDetail(gst_number:"${gst_number}"){
    gst_firm_name
    gst_firm_address
    gst_number
  }
}`;
}
function GetAllListings(car_id: string) {
  return `query{
      getAllListings(car_id: "${car_id}"){
        listing_start_date
        listing_end_date
        }}`;
}
function GetBookingDetails(customer_booking_id: string) {
  return `query{
  verifyPayUPayment(customer_booking_id:"${customer_booking_id}"){
    booking_date
    booking_amount
    booking_status
    payment_status
    protection_plan_type
    protection_plan_amount
    payment_info
    car_id
    start_date
    end_date
    start_date
    end_date
    car_id
    customer_booking_id
  }
}`;
}
function referralCouponQuery(amount: number) {
  return `query {
  referralDiscount(total_amount:${amount}
  ) {
    referral_discount_amount
  }
}`;
}
function GetCustomerBookingDetails() {
  return `
  query{
  getCustomerBookingDetails{
    booking_id
    customer_booking_id
    start_date
    end_date
    actual_end_date
    actual_start_date
    booking_date
    booking_amount
    pick_up_fuel
    drop_off_fuel
    extra_fuel_charges
    government_challans
    car_damage_charges
    trip_extension_charges
    discount
    images
    booking_status
    payment_status
    lats
    longs
  }
  
}`;
}

function getBookingDetailsById(customer_booking_id: string) {
  return `
  query {
  getBookingDetailsByBookingId(customer_booking_id: "${customer_booking_id}") {
    customer_booking_id
    customer_name
    owner_name
    car_id
    car_number
    start_date
    end_date
    actual_start_date
    actual_end_date
    booking_date
    booking_amount
    booking_status
    payment_status
    protection_plan_amount
    protection_plan_type
    payment_info
  }
}`;
}
function carAvailabilityDateQuery(customer_booking_id: string) {
  return `
  query{
  carAvailabilityDate(customer_booking_id: "${customer_booking_id}"){
    next_available_date
  }
}`;
}
export {
  createBookingQuery,
  CustomerLoginQuery,
  UpdateCustomerQuery,
  createCustomerProfileQuery,
  CustomerDetailsQuery,
  updateWishlistDetailsQuery,
  GetGstDetailsQuery,
  UpdateGstDetailsQuery,
  GetGstDetailQuery,
  GetAllListings,
  GetBookingDetails,
  referralCouponQuery,
  GetCustomerBookingDetails,
  getBookingDetailsById,
  carAvailabilityDateQuery
};
