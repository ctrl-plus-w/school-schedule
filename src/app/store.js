import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/database/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
