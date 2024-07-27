import { DATETIME_VALUES, LOCATION_VALUES } from "../actionTypes/actionTypes";

export const setLocation=  ( addressStr:any, lat:any, lng:any) => {
  return {
    type: LOCATION_VALUES,
    payload: {
       address:addressStr, lat, lng
    },
  };
};

export const setDateTime = (startDate:any,endDate:any) =>{
  return{
    type:DATETIME_VALUES,
    payload:{
      startDate,endDate
    }
  }
}