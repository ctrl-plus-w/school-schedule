import { configureStore } from '@reduxjs/toolkit';

import databaseReducer from '../features/database/databaseSlice';

export default configureStore({
  reducer: {
    database: databaseReducer,
  },
});
