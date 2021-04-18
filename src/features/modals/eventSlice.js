import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'event',

  initialState: {
    visible: false,

    id: '',
    title: '',
    link: '',
    description: '',
    start: '',
    pin: '',
    pinColor: '',
    subjectOwner: '',
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

export const selectInfos = (state) => state.modals.event;

export default slice.reducer;
