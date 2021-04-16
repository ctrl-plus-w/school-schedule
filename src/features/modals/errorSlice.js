import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'error',

  initialState: {
    errors: [],
  },

  reducers: {
    addError: (state, action) => ({
      errors: [...state.errors, action.payload],
    }),

    removeError: (state, action) => {
      state.errors.splice(action.payload, 1);
    },
  },
});

export const { addError, removeError } = slice.actions;

export const selectErrors = (state) => state.modals.error.errors;

export default slice.reducer;
