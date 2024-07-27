import {combineReducers} from 'redux';
import homePageReducer from './homePageReducer';
import landingPageReducer from './landingPageReducer';
import billingPageReducer from './billingPageReducer';

const rootReducer = combineReducers ({
  homePageReducer,    
  landingPageReducer,
  billingPageReducer
});

export default rootReducer;
