import { combineReducers } from 'redux';

import errorReducer from './errorSlice';
import eventReducer from './eventSlice';
import createReducer from './createSlice';

export default combineReducers({
  error: errorReducer,
  event: eventReducer,
  create: createReducer,
});
