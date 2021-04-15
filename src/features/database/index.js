import { combineReducers } from 'redux';

import authReducer from './authSlice';
import eventsReducer from './eventsSlice';

export default combineReducers({
  events: eventsReducer,
  auth: authReducer,
});
