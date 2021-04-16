import { combineReducers } from 'redux';

import authReducer from './authSlice';
import eventsReducer from './eventsSlice';
import labelsReducer from './labelsSlice';

export default combineReducers({
  events: eventsReducer,
  auth: authReducer,
  labels: labelsReducer,
});
