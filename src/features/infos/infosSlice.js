import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'infos',

  initialState: {
    selectedLabel: '',

    selectedEvents: {},
  },

  reducers: {
    setLabel: (state, action) => ({
      ...state,
      selectedLabel: action.payload,
    }),

    addEvent: (state, action) => {
      const day = state.selectedEvents[action.payload.date];
      if (day) state.selectedEvents[action.payload.date].push({ start: action.payload.start, obligatory: true });
      else state.selectedEvents[action.payload.date] = [{ start: action.payload.start, obligatory: true }];
    },

    removeEvent: (state, action) => {
      const timeFilter = ({ start }) => start !== action.payload.start;
      state.selectedEvents[action.payload.date] = state.selectedEvents[action.payload.date].filter(timeFilter);
    },

    editEvent: (state, action) => {
      const day = state.selectedEvents[action.payload.date];
      if (day) day.find(({ start }) => start === action.payload.start).obligatory = action.payload.obligatory;
      else state.selectedEvents[action.payload.date] = [{ start: action.payload.start, obligatory: action.payload.obligatory }];
    },
  },
});

export const { setLabel, addEvent, removeEvent, editEvent } = slice.actions;

export const selectEvents = (state) => state.infos.selectedEvents;
export const selectLabel = (state) => state.infos.selectedLabel;

export default slice.reducer;
