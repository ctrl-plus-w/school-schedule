import { combineReducers } from 'redux';

import errorReducer from './errorSlice';
import editReducer from './editSlice';
import tooltipReducer from './tooltipSlice';

export default combineReducers({
  error: errorReducer,
  edit: editReducer,
  tooltip: tooltipReducer,
});
