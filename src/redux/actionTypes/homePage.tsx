import { CAR_LIST, SEARCH } from "../actionTypes/actionTypes";
import { getAvailableCarsQuery } from '../../graphqlQueries/CarDetailsQuery';
import { resolvePostApi, resolvePostApiWithHeaders } from '../../Common/ResolveApi';


export const fetchCarList= async (starts:any, ends:any, lat:any, lng:any, sortBy:any, filterValue:any) => {
   const { getAvailableCars } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, getAvailableCarsQuery(starts, ends, lat, lng, sortBy, filterValue));

  return {
    type: CAR_LIST,
    payload: getAvailableCars,
  };
};

export const setSearchParams= async (searchStr:any) => {
  return {
    type: SEARCH,
    payload: searchStr,
  };
};
