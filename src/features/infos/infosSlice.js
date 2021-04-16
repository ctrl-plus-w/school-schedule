import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'infos',

  initialState: {
    selectedLabel: '',
  },

  reducers: {
    setLabel: (state, action) => ({
      ...state,
      selectedLabel: action.payload,
    }),
  },
});

export const { setLabel } = slice.actions;

export const selectLabel = (state) => state.infos.selectedLabel;

export default slice.reducer;
