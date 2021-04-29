import { getMonth, getWeekDay } from '../../utils/Calendar';
import Time from '../../utils/Time';

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
  visible: true,

  title: '',
  date: [getWeekDay(now), now.getDate(), getMonth(now)].join(' '),
  time: Time.timeStringFromDate(now),

  obligatory: true,
  description: '',
  link: '',

  subjects: [],
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
