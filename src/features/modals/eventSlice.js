import { createSlice } from '@reduxjs/toolkit';

const setBodyOverflow = (hidden) => {
  document.body.style.overflow = hidden ? 'hidden' : '';
};

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
    owner: {},
  },

  reducers: {
    hide: (state) => {
      setBodyOverflow(false);
      return { ...state, visible: false };
    },

    config: (state, action) => {
      setBodyOverflow(true);
      return { ...state, ...action.payload, visible: true };
    },
  },
});

export const { hide, config } = slice.actions;

export const selectInfos = (state) => state.modals.event;

export default slice.reducer;
