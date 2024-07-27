import { CAR_LIST, SEARCH } from "../actionTypes/actionTypes";
const initialState = {
   availableCarsDataList: []
};


 const homePageReducer = (state = initialState, action:any) => {
  const { type, payload } = action;
  switch (type) {
    case CAR_LIST:
      return {
        ...state,
        availableCarsDataList: payload
      };
    case SEARCH:
      return {
        ...state,
        searchParams: payload
      };
    default:
      return state;
  }
};

export default homePageReducer;