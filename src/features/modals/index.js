import { combineReducers } from 'redux';

import errorReducer from './errorSlice';
import editReducer from './editSlice';
import tooltipReducer from './tooltipSlice';
import planReducer from './planSlice';

export default combineReducers({
  error: errorReducer,
  edit: editReducer,
  tooltip: tooltipReducer,
  plan: planReducer,
});
