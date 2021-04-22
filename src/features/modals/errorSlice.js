import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: [],
};

const slice = createSlice({
  name: 'error',

  initialState: initialState,

  reducers: {
    addError: (state, action) => ({
      errors: [...state.errors, action.payload],
    }),

    removeError: (state, action) => {
      state.errors.splice(action.payload, 1);
    },

    reset: () => initialState,
  },
});

export const { addError, removeError, reset } = slice.actions;

export const selectErrors = (state) => state.modals.error.errors;

export default slice.reducer;
