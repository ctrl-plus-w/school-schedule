import { combineReducers } from 'redux';

import errorReducer from './errorSlice';

export default combineReducers({
  error: errorReducer,
});
