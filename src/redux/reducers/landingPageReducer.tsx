import { DATETIME_VALUES, LOCATION_VALUES } from '../actionTypes/actionTypes';
const initialState = {
  LocationValues: '',
  address: '',
  DateTimeValues: ''
};

const landingPageReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case LOCATION_VALUES:
      return {
        ...state,
        LocationValues: payload
      };
    case DATETIME_VALUES:
      return {
        ...state,
        DateTimeValues: payload
      };
    default:
      return state;
  }
};

export default landingPageReducer;
