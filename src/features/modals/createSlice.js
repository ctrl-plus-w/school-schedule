import { createSlice } from '@reduxjs/toolkit';

const setBodyOverflow = (hidden) => {
  document.body.style.overflow = hidden ? 'hidden' : '';
};

const slice = createSlice({
  name: 'create',

  initialState: {
    visible: false,

    title: '',
    description: '',

    events: [],
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

export const { show, hide, config } = slice.actions;

export const selectInfos = (state) => state.modals.create;
export const selectVisible = (state) => state.modals.create.visible;

export default slice.reducer;
