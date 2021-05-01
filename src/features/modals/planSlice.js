const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const planEvent = createAsyncThunk('plan/event', async (args, { dispatch }) => {
  try {
    args;
    // Make the request...
  } catch (err) {
    dispatch;
    // Throw an error...
  }
});

const now = new Date();

const initialState = {
  visible: false,

  title: '',
  startDate: now.toISOString(),
  startTime: [8, 0],
  duration: 1,
};

const slice = createSlice({
  name: 'plan',

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

export const selectInfos = (state) => state.modals.plan;

export default slice.reducer;
