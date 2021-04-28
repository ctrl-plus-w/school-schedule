import { combineReducers } from 'redux';

import errorReducer from './errorSlice';
import eventReducer from './eventSlice';
import createReducer from './createSlice';
import tooltipReducer from './tooltipSlice';

export default combineReducers({
  error: errorReducer,
  event: eventReducer,
  create: createReducer,
  tooltip: tooltipReducer,
});
