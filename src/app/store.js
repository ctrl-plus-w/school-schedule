import { configureStore } from '@reduxjs/toolkit';

// import logger from 'redux-logger';

import databaseReducer from '../features/database';

const store = configureStore({
  reducer: databaseReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});

export default store;
