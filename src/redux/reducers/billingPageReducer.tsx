import { TOTAL_AMOUNT, DISCOUNT_COUPON } from "../actionTypes/actionTypes";
const initialState = {
    selectedProtectionPlan: 0,
    couponStatus: '',
    couponButton: false,
    totalAmount: 0 ,
    referralDiscountAmount: 0,
    promoCode: '',
    discountAmount: 0,
};


 const billingPageReducer = (state = initialState, action:any) => {
  const { type, payload } = action;
  switch (type) {
    case TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: payload,
      };
    case DISCOUNT_COUPON:
      return {
        ...state,
        discountAmount: payload.discountAmount,
      };
    default:
      return state;
  }
};

export default billingPageReducer;                                                      