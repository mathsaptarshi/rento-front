import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import * as appReducers from './appReducers/appReducers';
import * as authReducer from './appReducers/authReducers';
import * as cabReducer from './appReducers/cabReducers';
import * as tariffReducer from './appReducers/tariffReducers';
import * as bookingReducer from './appReducers/bookingReducers';

const formReducers = {
  form: formReducer
}
const appReducer = combineReducers(Object.assign({},
  appReducers,
  formReducers,
  authReducer,
  cabReducer,
  tariffReducer,
  bookingReducer
  ));
export default appReducer;

// const cabReducer = combineReducers(Object.assign({},
//   cabReducer,
//   authReducer
//   ));
// export default cabReducer;