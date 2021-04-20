import { combineReducers } from 'redux';

import authReducer from './authSlice';
import eventsReducer from './eventsSlice';
import labelsReducer from './labelsSlice';
import subjectsReducer from './subjectsSlice';

export default combineReducers({
  events: eventsReducer,
  auth: authReducer,
  labels: labelsReducer,
  subjects: subjectsReducer,
});
