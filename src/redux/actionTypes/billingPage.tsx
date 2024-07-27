import { DISCOUNT_COUPON, TOTAL_AMOUNT } from "../actionTypes/actionTypes";


export const setTotalPriceAmout =  (totalPrice:any) => {
  return {
    type: TOTAL_AMOUNT,
    payload: totalPrice,
  };
};