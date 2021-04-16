import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'create',

  initialState: {
    visible: false,

    title: '',
    description: '',

    events: [],
  },

  reducers: {
    show: (state) => ({
      ...state,
      visible: true,
    }),

    hide: (state) => ({
      ...state,
      visible: false,
    }),

    config: (state, action) => ({
      ...state,
      ...action.payload,
      visible: true,
    }),
  },
});

export const { show, hide, config } = slice.actions;

export const selectInfos = (state) => state.modals.create;

export default slice.reducer;
