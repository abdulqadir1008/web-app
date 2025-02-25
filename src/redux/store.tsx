import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxPromise from 'redux-promise';

import rootReducer from "./reducers/RootReducer";
const initialState = {};

const middleware = [ thunk, ReduxPromise ];
const configureStore = () => {

  const store = createStore (
    rootReducer,
    initialState,
    composeWithDevTools (applyMiddleware (...middleware))
  );

  return store;
};

export default configureStore;
