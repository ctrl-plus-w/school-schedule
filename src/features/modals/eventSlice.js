import { createSlice } from '@reduxjs/toolkit';

const setBodyOverflow = (hidden) => {
  document.body.style.overflow = hidden ? 'hidden' : '';
};

const initialState = {
  visible: false,

  id: '',
  title: '',
  link: '',
  description: '',
  start: '',
  pin: '',
  pinColor: '',
  owner: {},
};

const slice = createSlice({
  name: 'event',

  initialState: initialState,

  reducers: {
    hide: (state) => {
      setBodyOverflow(false);
      return { ...state, visible: false };
    },

    config: (state, action) => {
      setBodyOverflow(true);
      return { ...state, ...action.payload, visible: true };
    },

    reset: () => initialState,
  },
});

export const { hide, config, reset } = slice.actions;

export const selectInfos = (state) => state.modals.event;
export const selectVisible = (state) => state.modals.event.visible;

export default slice.reducer;
