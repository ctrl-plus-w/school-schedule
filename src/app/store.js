import { configureStore } from '@reduxjs/toolkit';

import databaseReducer from '../features/database';
import modalsReducer from '../features/modals';
import infosReducer from '../features/infos/infosSlice';

const store = configureStore({
  reducer: {
    database: databaseReducer,
    modals: modalsReducer,
    infos: infosReducer,
  },

  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],

  devTools: true,
});

export default store;
