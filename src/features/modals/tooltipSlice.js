import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  title: '',
  description: '',

  fieldName: '',
  fieldContent: '',
};

const slice = createSlice({
  name: 'tooltip',

  initialState,

  reducers: {
    config: (_state, action) => ({
      visible: true,
      ...action.payload,
    }),

    hide: (state) => ({
      ...state,
      visible: false,
    }),
  },
});

export const selectInfos = (state) => state.modals.tooltip;

export const { config, hide } = slice.actions;

export default slice.reducer;
