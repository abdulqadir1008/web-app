import { DateTimeFormatter } from '../Common/DateTimeFormatter';

function PayuQuery(car_id: any, starts: any, ends: any, booking_amount: any, protection_plan_type: any, protection_plan_amount: any) {
  const startDate = DateTimeFormatter(starts);
  const endDate = DateTimeFormatter(ends);
  return `
      mutation {
  createPayUPayment(bookingInfo:{
    booking_amount:${booking_amount}
    protection_plan_type:${protection_plan_type}
    protection_plan_amount:${protection_plan_amount}
    car_id:"${car_id}"
    dateInputs:{
      start_date:"${startDate}"
      end_date:"${endDate}"
    }
  })
  {
    amount
    customer_booking_id
    car_id
    booking_id
    full_name
    email_id
    phone_number
    hash
    key
  }
}`;
}
function ValidateCoupon(promoCode: string, totalAmount: number) {
  return `query{  
    validateCouponCode(coupon_code: "${promoCode}", total_amount: ${totalAmount}){
        discount_amount 
         coupon_status 
         }
        }`;
}
function GetCouponQuery() {
  return `query {
  getCoupons {
    active_coupons {
      coupon_title
      coupon_max_discount
      coupon_percentage
    }
    used_coupons {
      coupon_title
      coupon_max_discount
      coupon_percentage
    }
    expired_coupons {
      coupon_title
      coupon_max_discount
      coupon_percentage
    }
  }
}

`;
}
export { PayuQuery, ValidateCoupon, GetCouponQuery };
