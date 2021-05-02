const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  visible: false,

  ids: [],
  title: '',

  obligatory: true,
  description: '',
  link: '',
};

const slice = createSlice({
  name: 'edit',

  initialState,

  reducers: {
    config: (state, action) => ({
      ...state,
      ...action.payload,
      visible: true,
    }),

    hide: (state) => ({
      ...state,
      visible: false,
    }),

    reset: () => initialState,
  },
});

export const { config, hide, reset } = slice.actions;

export const selectInfos = (state) => state.modals.edit;

export default slice.reducer;
