import { combineReducers } from 'redux';

import errorReducer from './errorSlice';
import eventReducer from './eventSlice';

export default combineReducers({
  error: errorReducer,
  event: eventReducer,
});
