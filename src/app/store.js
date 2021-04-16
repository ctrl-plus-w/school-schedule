import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';

import databaseReducer from '../features/database';
import modalsReducer from '../features/modals';

const store = configureStore({
  reducer: {
    database: databaseReducer,
    modals: modalsReducer,
  },

  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],

  devTools: true,
});

export default store;
